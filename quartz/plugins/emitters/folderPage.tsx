import path from "path";
import { defaultListPageLayout, sharedPageComponents } from "../../../quartz.layout";
import { FullPageLayout } from "../../cfg";
import { FolderContent } from "../../components";
import BodyConstructor from "../../components/Body";
import HeaderConstructor from "../../components/Header";
import { pageResources, renderPage } from "../../components/renderPage";
import { QuartzComponentProps } from "../../components/types";
import DepGraph from "../../depgraph";
import { i18n } from "../../i18n";
import { FilePath, FullSlug, joinSegments, pathToRoot, SimpleSlug, simplifySlug, stripSlashes } from "../../util/path";
import { QuartzEmitterPlugin } from "../types";
import { defaultProcessedContent, ProcessedContent } from "../vfile";
import { write } from "./helpers";

export const FolderPage: QuartzEmitterPlugin<Partial<FullPageLayout>> = (userOpts) => {
  const opts: FullPageLayout = {
    ...sharedPageComponents,
    ...defaultListPageLayout,
    pageBody: FolderContent(),
    ...userOpts,
  };

  const { head: Head, header, beforeBody, pageBody, left, right, footer: Footer } = opts;
  const Header = HeaderConstructor();
  const Body = BodyConstructor();

  return {
    name: "FolderPage",
    getQuartzComponents() {
      return [Head, Header, Body, ...header, ...beforeBody, pageBody, ...left, ...right, Footer];
    },
    async getDependencyGraph(_ctx, content, _resources) {
      // Example graph:
      // nested/file.md --> nested/index.html
      // nested/file2.md ------^
      const graph = new DepGraph<FilePath>();

      content.map(([_tree, vfile]) => {
        const slug = vfile.data.slug;
        const folderName = path.dirname(slug ?? "") as SimpleSlug;
        if (slug && folderName !== "." && folderName !== "tags") {
          graph.addEdge(vfile.data.filePath!, joinSegments(folderName, "index.html") as FilePath);
        }
      });

      return graph;
    },
    async emit(ctx, content, resources): Promise<FilePath[]> {
      const fps: FilePath[] = [];
      const allFiles = content.map((c) => c[1].data);
      const cfg = ctx.cfg.configuration;

      const folders: Set<SimpleSlug> = new Set(
        allFiles.flatMap((data) => {
          const slug = data.slug;
          const folderName = path.dirname(slug ?? "") as SimpleSlug;
          if (slug && folderName !== "." && folderName !== "tags") {
            return [folderName];
          }
          return [];
        }),
      );

      const folderDescriptions: Record<string, ProcessedContent> = Object.fromEntries(
        [...folders].map((folder) => [
          folder,
          defaultProcessedContent({
            slug: joinSegments(folder, "index") as FullSlug,
            frontmatter: {
              title: `${i18n(cfg.locale).pages.folderContent.folder}: ${folder}`,
              tags: [],
            },
          }),
        ]),
      );

      for (const [tree, file] of content) {
        const slug = stripSlashes(simplifySlug(file.data.slug!)) as SimpleSlug;
        if (folders.has(slug)) {
          folderDescriptions[slug] = [tree, file];
        }
      }

      for (const folder of folders) {
        const slug = joinSegments(folder, "index") as FullSlug;
        const externalResources = pageResources(pathToRoot(slug), resources);
        const [tree, file] = folderDescriptions[folder];
        const componentData: QuartzComponentProps = {
          ctx,
          fileData: file.data,
          externalResources,
          cfg,
          children: [],
          tree,
          allFiles,
        };

        const content = renderPage(cfg, slug, componentData, opts, externalResources);
        const fp = await write({
          ctx,
          content,
          slug,
          ext: ".html",
        });

        fps.push(fp);
      }
      return fps;
    },
  };
};
