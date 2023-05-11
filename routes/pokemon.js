const express = require('express')
const router = express.Router()

const pokemonCtrl = require('../controllers/pokemon')

router.get('/:name', pokemonCtrl.show)
router.post('/:battleId', pokemonCtrl.addPokemonToTeam)
router.delete('/:battleId/:pokemonId', pokemonCtrl.deletePokemonFromTeam)

module.exports = router