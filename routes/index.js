const express = require('express');
const router = express.Router();
const passport = require('passport')
const fetch = require('node-fetch')

router.get('/', function(req, res, next) {
  fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
		.then((res) => res.json())
		.then((pokemon) => {
			res.render('pokedex/index', {
				pokemon: pokemon.results,
				title: 'Pokedex',
			})
		})
})

router.get('/auth/google', passport.authenticate(
  'google', 
  { scope: ['profile', 'email'] }
))

router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/',
    failureRedirect: '/'
  }
))

router.get('/logout', function(req, res){
  req.logout(function() {
    res.redirect('/')
  })
})

module.exports = router;
