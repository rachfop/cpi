import { PageLayout, SharedLayout } from "./quartz/cfg";
import * as Component from "./quartz/components";

function customSortFn(a, b) {
  const tocA = a.file?.frontmatter?.toc ?? Infinity;
  const tocB = b.file?.frontmatter?.toc ?? Infinity;
  return tocA - tocB;
}

function customMapFn(node) {
  if (node.file) {
    node.displayName = node.file.frontmatter?.sidebar ?? node.displayName;
  }
}

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/rachfop",
      Medium: "https://medium.com/@patford12",
    },
  }),
};

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(
      Component.Explorer({
        sortFn: customSortFn,
        filterFn: (node) => node.name !== "tags", // filters out 'tags' folder
        mapFn: customMapFn,
      })
    ),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
};

// components for pages that display lists of pages (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(
      Component.Explorer({
        sortFn: customSortFn,
        filterFn: (node) => node.name !== "tags", // filters out 'tags' folder
        mapFn: customMapFn,
      })
    ),
  ],
  right: [],
};
