const BattleTeam = require('../models/battle-team')
const fetch = require('node-fetch')

function show(req, res, next) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${req.params.name}`)
    .then((res) => res.json())
    .then((pokemon) => {
        res.render('pokedex/show', {
            pokemon,
            title: 'Pokemon Details',
        })
    })
    .catch(next)
}

function addPokemonToTeam(req, res, next) {
    BattleTeam.findById(req.params.battleId)
    .then((battleTeam) => {
        console.log(battleTeam)
        battleTeam.pokemon.push(req.body)
        return battleTeam.save()
    })
    .then(() => res.redirect(`/battle-teams/${req.params.battleId}`))
    .catch(next)
}

function deletePokemonFromTeam(req, res, next) {
    BattleTeam.findById(req.params.battleId)
    .then((battleTeam) => {
        if (!battleTeam.user.equals(req.user._id)) throw new Error('Unauthorized')
        battleTeam.pokemon.id(req.params.pokemonId).deleteOne()
        return battleTeam.save()
    })
    .then(() => res.redirect(`/battle-teams/${req.params.battleId}`))
    .catch(next)
}

module.exports = {
	show,
	addPokemonToTeam,
    deletePokemonFromTeam,
}