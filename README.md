# docs-from-docfx

Creates a NextJS site from docfx configuration file and accompanying docs.

## Getting started

1. Clone this repo
1. Run `npm install`
1. Rename .env-local to .env and update docfx project path and docfx json file name.
1. Run `npm run build` to generate the site
1. Run `npm run dev` to start the site locally

### Current status

Based the environment variables, it reads the docfx json file and use the content items to determine which files to create and return slugs for in 'GetStaticPaths'.
Then, each slug is passed into 'GetStaticProps' where is is used to get the content and language for that page.

### Future Plan

- [ ] The content and language will be used to populate the ArticlePage component. 
  That ArticlePage component will be responsible for transforming the frontmatter and markdown accordingly.

- [ ] Process the table of content files (toc.yml) and build up the Toc component accordingly.

- [ ] Special handling for a [to be created] Breadcrump component, either by toc items, or support breadcrumb.yml files.
