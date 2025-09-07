import { supabase } from '../config/db.js';

const fileNoteController = {
    // Create a new file note configuration
    createFileNote: async (req, res) => {
        try {
            const {
                validTill,
                departmentId,
                filenoteConfigIcon,
                currencyTypeName,
                filenoteName,
                isoNumber
            } = req.body;

            // Input validation
            if (!validTill) throw new Error('validTill is required');
            if (!departmentId) throw new Error('departmentId is required');
            if (!filenoteConfigIcon) throw new Error('filenoteConfigIcon is required');
            if (!currencyTypeName) throw new Error('currencyTypeName is required');
            if (!filenoteName) throw new Error('filenoteName is required');
            if (!isoNumber) throw new Error('isoNumber is required');

            // Insert new file note configuration
            const { data, error } = await supabase
                .from('file_notes')
                .insert([{
                    valid_till: validTill,
                    department_id: departmentId,
                    config_icon: filenoteConfigIcon,
                    currency_type: currencyTypeName,
                    name: filenoteName,
                    iso_number: isoNumber,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                }])
                .select();

            if (error) throw error;

            return res.status(201).json({
                success: 1,
                data: data[0]
            });
        } catch (error) {
            console.error('Error creating file note:', error);
            return res.status(400).json({
                success: 0,
                message: error.message || 'Failed to create file note'
            });
        }
    },

    // Get all file notes
    getAllFileNotes: async (req, res) => {
        try {
            const { data, error } = await supabase
                .from('file_notes')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;

            return res.json({
                success: 1,
                data: data
            });
        } catch (error) {
            console.error('Error fetching file notes:', error);
            return res.status(500).json({
                success: 0,
                message: 'Failed to fetch file notes'
            });
        }
    },

    // Get single file note by ID
    getFileNoteById: async (req, res) => {
        try {
            const { id } = req.params;
            
            const { data, error } = await supabase
                .from('file_notes')
                .select('*')
                .eq('id', id)
                .single();

            if (error) throw error;
            if (!data) {
                return res.status(404).json({
                    success: 0,
                    message: 'File note not found'
                });
            }

            return res.json({
                success: 1,
                data: data
            });
        } catch (error) {
            console.error('Error fetching file note:', error);
            return res.status(500).json({
                success: 0,
                message: 'Failed to fetch file note'
            });
        }
    },

    // Update file note
    updateFileNote: async (req, res) => {
        try {
            const { id } = req.params;
            const updateData = req.body;

            // Add updated_at timestamp
            updateData.updated_at = new Date().toISOString();

            const { data, error } = await supabase
                .from('file_notes')
                .update(updateData)
                .eq('id', id)
                .select();

            if (error) throw error;
            if (!data || data.length === 0) {
                return res.status(404).json({
                    success: 0,
                    message: 'File note not found'
                });
            }

            return res.json({
                success: 1,
                data: data[0]
            });
        } catch (error) {
            console.error('Error updating file note:', error);
            return res.status(400).json({
                success: 0,
                message: error.message || 'Failed to update file note'
            });
        }
    },

    // Delete file note
    deleteFileNote: async (req, res) => {
        try {
            const { id } = req.params;

            const { error } = await supabase
                .from('file_notes')
                .delete()
                .eq('id', id);

            if (error) throw error;

            return res.json({
                success: 1,
                message: 'File note deleted successfully'
            });
        } catch (error) {
            console.error('Error deleting file note:', error);
            return res.status(500).json({
                success: 0,
                message: 'Failed to delete file note'
            });
        }
    }
};

export default fileNoteController;
