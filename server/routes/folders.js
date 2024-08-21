const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = require('express').Router();

router.get('/', async (req, res) => {
    try {
        const folders = await prisma.folder.findMany();
        
        if(folders) {
            res.status(200).json({
                message: 'Retreived folders successfuly',
                folders: folders
            })
        }

    } catch(err) {
        res.status(500).json({message: 'Failed to get folders'})
        console.log(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const folder = await prisma.folder.findUnique({
            where: {
                id: id
            },
            include: {
                files: true
            }
        });

        res.status(200).json({
            message: 'Returned Folder Successfuly',
            folder: folder
        });
    } catch(err) {
        console.log(err);
    }
});

//Delete

//All records
router.delete('/', async (req, res) => {
    try {
        await prisma.folder.deleteMany({});
    } catch(err) {
        console.log(err);
    }
});

//A single record
router.delete('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        await prisma.folder.delete({
            where: {
                id: id
            }
        })
    } catch(err) {
        console.log(err);
    }
});

//create a folder
router.post('/', async (req, res) => {
    try {
        const folder = await prisma.folder.create({
            data: {
                name: req.body.name,
                description: req.body.description,
                userId: req.body.user_id
            }
        });

        res.status(201).json({
            message: 'Created folder successfuly',
            folder: folder
        });

    } catch(err) {
        res.status(500).json({
            message: 'Cannot create folder'
        })
        console.log(err);
    }
});

//Update
router.put('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        await prisma.folder.update({
            where: {
                id: id
            },
            data: {
                name: req.body.name,
                description: req.body.description,
                userId: req.body.user_id
            }
        })
    } catch(err) {
        req.status(500).json({
            message: 'Cannot update folder'
        })
        console.log(err);
    }
});



module.exports = router;