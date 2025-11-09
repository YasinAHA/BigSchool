# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.1] - 2025-10-10
### Added
- Buscador por nombre en la página principal con filtrado dinámico y mensaje cuando no hay coincidencias.

## [0.3.0] - 2025-10-09
### Added
- Selector de vista en la página principal para alternar entre el diseño de tarjetas y un nuevo listado horizontal de Pokémon.
- Componente `PokemonListRow` reutilizable para mostrar cada Pokémon en formato de lista accesible.

## [0.2.1] - 2025-10-08
### Fixed
- Se configuró `next/image` para permitir la descarga de las ilustraciones oficiales desde `raw.githubusercontent.com`, evitando errores en tiempo de ejecución.

## [0.2.0] - 2025-10-07
### Added
- Pokédex inicial con generación estática de los primeros 151 Pokémon y navegación entre listados y detalles.
- Componente `PokemonCard` reutilizable con soporte para imágenes oficiales y enlaces de Next.js.
- Documentación en `/docs` describiendo el alcance de la versión 0.2.0.

### Changed
- Migración a la carpeta `pages` para aprovechar `getStaticProps` y `getStaticPaths` en Next.js.
- Configuración global actualizada para estilos y adaptación de Axios mediante un adaptador basado en `fetch`.
