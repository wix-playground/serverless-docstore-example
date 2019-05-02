const COLLECTION_NAME = 'some-collection'

module.exports = (functionsBuilder) =>
  functionsBuilder
    .withNamespace('docstore-example')
    .addWebFunction('GET', '/resources/:id', (ctx, req) => {
       return ctx.docstore.get(COLLECTION_NAME, req.params.id);
    })
    .addWebFunction('GET', '/isalive', () => {
      return 'Alive';
    });
