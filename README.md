![Arranger: Data Portal Generation](https://i.imgur.com/Qb9KBqJ.png)

🚧 _under construction_

### Motivation

The Ontario Institute for Cancer Research (OICR) has built two **Data Portals**:

* [International Cancer Genome Consortium (ICGC) Data Portal](https://dcc.icgc.org/)
* [Genomic Data Commons (GDC) Data Portal](https://portal.gdc.cancer.gov/) (joint effort with University of Chicago)

Although they are not identical in architecture, available data or overall purpose, there is tremendous amount of overlap in how they function and how users interact with them, despite being implemented differently. It's no coincidence. The GDC Data Portal was directly influenced by the ICGC Data Portal.

With new projects ahead of us, there is an opportunity to create a framework designed to act as a core library for any given data portal, similar to what Elastic's Kibana accomplishes, but based on the features of our existing portals. There are many potential benefits:

* Reduce duplicate code
* Ability to fix bugs and add features to many projects at once
* Pool developer resources
* Increase cross-team communication
* Encourage open source contribution

### Goals

#### Short Term

* Provide all necessary modules to implement searching functionality
  * Dynamic GraphQL schema generation
  * API Server (GraphQL endpoint)
  * Query / Aggregation building middleware
  * Response middleware (ie. removing null aggregations)
  * UI Components
    * Aggregations
      * Simple view
      * Advanced View
    * Results Table
    * SQON Display

- Provide editor interface to expose common transformations (similar to the [Babel](https://babeljs.io/repl/) or [bodybuilder](thttp://bodybuilder.js.org/) REPLs)
  * Elasticsearch Mappings -> GraphQL Schema
  * GraphQL Query -> Elasticsearch Queries

#### Medium Term

* Authentication
* Sets
* Analysis

#### Long Term

* Kibana Plugin
* Hosted Data Portal generating service

### Topology

![DP Topology](https://i.imgur.com/Ylm9drr.png)
_this is slightly too simplistic. needs an update_
