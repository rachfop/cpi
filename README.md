# Cross-Program Invocations (CPI)

This repository hosts both the codebase and documentation for the Cross-Program Invocations (CPI) project.
It is organized into two main directories: `quartz` and `puppet`, each containing their respective configuration files, dependencies, and specific submodules.

- [CPI](https://github.com/rachfop/cpi)
- [CPI Code](https://github.com/rachfop/cpi-code)

### Quartz Directory

The `quartz` directory contains the documentation.
It includes TypeScript configuration, layout, configuration files, and a Dockerfile for containerization.

### Puppet Directory

The `puppet` directory contains the backend part of the project.
It includes configuration files for TypeScript and Rust, dependencies, and migration files.

### Running the Application

#### Quartz

To run the frontend application:

1. Navigate to the `quartz` directory:
   ```sh
   cd quartz
   ```

2. Start the application:
   ```sh
   npx quartz build --serve
   # npx quartz sync
   ```

#### Puppet

To run the backend application:

1. Navigate to the `puppet` directory:
   ```sh
   cd puppet
   ```

2. Start the application:
   ```sh
   cargo run
   ```
3. Test the application:
   ```sh
   yarn test
   ```

### Docker

To build and run the application using Docker:

1. Navigate to the `quartz` directory:
   ```sh
   cd quartz
   ```

2. Build the Docker image:
   ```sh
   docker build -t project-name-quartz .
   ```

3. Run the Docker container:
   ```sh
   docker run -p 3000:3000 project-name-quartz
   ```

## Format

To format the repo using dprint:
`sh dprint fmt`

## License

This project is licensed under the [LICENSE](LICENSE).
