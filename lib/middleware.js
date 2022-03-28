const getNewsData = () => [
  {
    heading: 'Chiropractor story !',
    body: "I have had back pain issues for more than 5 years. I was looking for a good chiropractor to fix me. If you don't know chiropractors reposition your spine by spinning your body around so you don't feel pain ! True magic, however all the chiropractors I have seen so far in Paris were able to cast this kind of magic on my spine. Thankfully, I checked if there were any good chiropractors in Sligo and there was one that picked my interest ! After a couple appointments, I can now live normally thanks to the magic of chiropratic. I also became a living spinning-top :)",
    Author: 'Kevin Tran'
  },
  {
      heading: 'I broke my glasses !',
      body: "So, I woke up and I saw that my glasses were broken. I forgot to take them off last night and I slept on it. Huge mistake ! One glass fell from the glasses so I had to got to the optician to repair them. Don't worry, they are repaired and I can see the world again !",
      Author: 'Kevin Tran',

  }  
]

const newsMiddleware = (req, res, next) => {
  if(!res.locals.partials) res.locals.partials = {}
  res.locals.partials.newsContext = getNewsData()
  next()
}

module.exports = {  
  newsMiddleware: newsMiddleware,
  flashMiddleware: (req, res, next) => {
  // if there's a flash message, transfer
  // it to the context, then clear it
  res.locals.flash = req.session.flash
  delete req.session.flash
  next()
  }
}