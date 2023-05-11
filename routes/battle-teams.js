const express = require('express')
const router = express.Router()

const battleTeamsCtrl = require('../controllers/battle-teams')

router.get('/', battleTeamsCtrl.index)
router.get('/new', battleTeamsCtrl.newBattleTeam)
router.post('/', battleTeamsCtrl.create)
router.get('/:id', battleTeamsCtrl.show)
router.get('/:id/edit', battleTeamsCtrl.updateBattleTeamForm)
router.put('/:id', battleTeamsCtrl.update)
router.delete('/:id', battleTeamsCtrl.deleteBattleTeam)

module.exports = router