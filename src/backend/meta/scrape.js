const url_metadata = require('url-metadata')

module.exports = {
  get: function (url, response) {
    url_metadata(url).then(
    function (meta) {
      let date = new Date(meta['article:published_time'] || meta['og:article:published_time'])

      const bibjson = {
        'type': meta['og:type'],
        'title': meta['title'] || meta['og:title'],
        'author': [{'name': meta['author'] || meta['article:author'] || meta['og:article:author']}],
        'year': date.getFullYear(),
        'month': date.getMonth(),
        'date': date.getDate()
      }

      if (process.env.NODE_ENV === '"development"')
      {
        console.log("> bibjson")
        console.log(bibjson)
        console.log("> meta")
        console.log(meta)
      }
      
      response.json(bibjson)
    },
    function (error) {
      console.error(error)
    })
  }
}
