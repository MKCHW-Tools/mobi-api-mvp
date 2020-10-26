const express = require('express')
const User = require('../models/user')
const {auth, authRole} = require('../helpers/authorize')
const {canEditNote, canViewNote,canDeleteNote, } = require('../capabilities/notes')
const {paginate} = require('../helpers/pagination')
const {ROLES} = require('../helpers/roles')

const router = express.Router()

router.post('/notes/add', auth, async (req, res) => {
    
    if(!req.body)
        return res.status(404).send({
            "result": "Failure",
            "msg": "Missing data"
        })

    const note = new Note(req.body)
    await note.save()

    const {_id, createdAt, title, details, status, category, tags, owner } = note

    return res.status(200).json({
        "result":"Success",
        "note": {
            createdAt,
            _id,
            title,
            details,
            status,
            category,
            tags,
            owner
        }
    })
})

const authNoteViewer = async (req, res, next) => {

    if(!req.user) 
        return res.status(403).json({
            'result': 'Failure',
            'msg': 'You need to Login please'
        })

    if(!canViewNote(req.user, req.params.id))
        return res.status(403).json({
            'result': 'Failure',
            'msg': 'Not Allowed'
        })

    next()
}

router.get('/notes/:id', auth, authNoteViewer, async (req, res) => {
    
    const {id} = req.params
    
    if(!id) return res.status(404).send('Not Found')

    const profile = await User.getUser(id)

    if(!profile) 
        return res.status(404).json({
            'result': 'Failure',
            'msg': 'Profile Not Found'
        })

    const {createdAt, _id, username, name, email, phone, roles} = profile

    res.status(200).send({
        "result":"Success",
        "profile": {
            createdAt,
            _id,
            username,
            name,
            email,
            phone,
            roles
        }
    })
})

router.get('/notes', auth, authRole(ROLES.ADMIN), paginate(Note), async (req, res) => {

    const {total, paginatedDocs:{next = 0}, paginatedDocs:{previous = 0}, paginatedDocs} = res

    if(!paginatedDocs) return res.status(404).send('Note not found')

    const notes = []
    const {docs} = paginatedDocs

    docs.forEach( doc => {
        let {_id, createdAt, title, details, category, owner, tags} = doc
        notes.push({
            _id,
            createdAt,
            owner,
            title,
            details,
            category,
            tags
        })
    })

    return res.status(200).json({
        "result" : "Success",
        total,
        next,
        previous,
        notes
    })
})

const authUpdateNote = async (req, res, next) => {

    if(!req.user)
        return res.status(403).json({
            'result': 'Failure',
            'msg': 'Not Allowed'
        })

    if(!req.params.id)
        return res.status(404).json({
            'result': 'Failure',
            'msg': 'Missing ID'
        })

    if(!canEditNote(req.user, req.params.id))
        return res.status(403).json({
            'result': 'Failure',
            'msg': 'Not Allowed'
        })

    next()
}

router.put('/notes/:id', auth, authUpdateNote, async (req, res) => {
    const {id} = req.params
    
    if( !id )
        return res.status(500).json({
            'result': 'Failure',
            'msg': 'Missing ID'
        })

    const note =  await Note.update( id, req.body )
    
    if(note) {

        const { _id, createdAt, title, details, owner, category, tags} = note

        return res.status(200).json({
            'result' : 'Success',
            'mgs' : 'Updated successfully',
            'note' : {
                _id,
                createdAt,
                title,
                details,
                owner,
                category,
                tags
            }
        })
        
    }

    return res.status(500).json({
        'result' : 'Failure',
        'msgs' : 'Updates failed',
    })
    
})

router.delete('/notes/delete/:id', auth, canDeleteNote, async (req, res) => {
    
    const id = req.params.id
    
    if( !id )
        return res.status(500).send({
            'result': 'Failure',
            'msg': 'Invalid resource'
        })
    
    try {
        
        const note = await Note.delete( id )

        if(note)
            return res.status(200).send({
                'result' : 'Success',
                'mgs' : 'Deleted successfully',
                'note' : note
            })
        
        return res.status(404).send({
            'result' : 'Failure',
            'msgs' : 'Unknown user',
        })

        
    } catch( e ) {
        console.log(e)
    }
    
})

module.exports = router