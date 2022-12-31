let nbt = {
  Book: {
    id: 'minecraft:writable_book',
    Count: { number: 1, type: 'b' },
    tag: { pages: [ '\\.[0-9]{2}', '278362742674826.928347894', '[0-9]*\\.[0-9]{2}' ] }
  },
  Page: 0
}
let obj = require("./usefulFuctions/JSONToNbt.js")(nbt);