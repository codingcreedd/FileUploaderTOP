const create_client = require('@supabase/supabase-js').createClient;
const router = require('express').Router();
const path = require('path');

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

require('dotenv').config();

const supabaseUrl = 'https://xrtnvgfbyqgolcigqcyu.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = create_client(supabaseUrl, supabaseKey);

const upload = require('../config/multer');

//Create a file (Add it to the req body using multer, and add the file name and the folder id from the request body sent from the frontend)
router.post('/upload', upload.single('file'), async (req, res) => {
    console.log('RUNNING')
    try {
        const file = req.file;
        console.log(file)
        const filePath = path.resolve(file.path);
        const {data, error} = await supabase.storage
            .from("uploads")
            .upload(`${file.filename}`, file.stream, {
                cacheControl: '3600',
                upsert: false
            });
            

        if(error) {
            console.error(error);
            console.log('An error occurreddd')
            res.status(500).json({message: 'Error uploading file'});
        } else {
            console.log(data);
            // res.json({message: 'File uploaded successfully'});
            await prisma.file.create({
                data: {
                    name: req.body.fileName,
                    userId: req.user.id,
                    folderId: Number(req.body.folderId),
                    fieldname: file.fieldname,
                    mimeType: file.mimetype,
                    destination: file.destination,
                    filename: file.filename,
                    path: filePath,
                    size: file.size,
                    fileUrl: data.path, //used to get the file from supabase
                }
            })

            res.status(201).json({
                message: 'Added File Successfully'
            })
        }

    } catch(err) {
        console.log(err);
        res.status(500).json({message: 'Error uploading file'});
    }
});
//Read a file

//Update a file
router.put('/:id/update', async (req, res) => {
    try {
        const {id} = req.params;
        const update_response = await prisma.file.update({
            where: {
                id: Number(id)
            }, 
            data: {
                name: req.body.name
            }
        });

        if(update_response) {
            res.status(201).json({
                message: 'Updated file successfully',
                updated_file: update_response
            });
        } else {
            res.status(500).json({message: 'Error updating file'});
        }

    } catch(err) {
        console.log(err);
        res.status(500).json({message: 'Could not update file'});
    }
})

//Delete a file

module.exports = router;