import { FastifyRequest, FastifyReply } from "fastify";

const supabase: any = null; // Supabase not configured in db.ts

const fileNoteController = {
    // File upload handler
    uploadFile: async (request: FastifyRequest | any, reply: FastifyReply) => {
        try {
            // Placeholder for file upload logic
            return reply.send({
                success: 1,
                message: "File upload logic not implemented",
                data: { url: "https://example.com/placeholder.pdf" }
            });
        } catch (error: any) {
            return reply.code(500).send({
                success: 0,
                message: error.message
            });
        }
    },

    // Create a new file note configuration
    createFileNote: async (request: FastifyRequest | any, reply: FastifyReply) => {
        try {
            const {
                validTill,
                departmentId,
                filenoteConfigIcon,
                currencyTypeName,
                filenoteName,
                isoNumber
            } = request.body as any;

            // Input validation
            if (!validTill) throw new Error('validTill is required');
            if (!departmentId) throw new Error('departmentId is required');
            if (!filenoteConfigIcon) throw new Error('filenoteConfigIcon is required');
            if (!currencyTypeName) throw new Error('currencyTypeName is required');
            if (!filenoteName) throw new Error('filenoteName is required');
            if (!isoNumber) throw new Error('isoNumber is required');

            // Insert new file note configuration
            const { data, error } = await (supabase as any)
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

            return reply.code(201).send({
                success: 1,
                data: data[0]
            });
        } catch (error: any) {
            console.error('Error creating file note:', error);
            return reply.code(400).send({
                success: 0,
                message: error.message || 'Failed to create file note'
            });
        }
    },

    // Get all file notes
    getAllFileNotes: async (request: FastifyRequest | any, reply: FastifyReply) => {
        try {
            const { data, error } = await (supabase as any)
                .from('file_notes')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;

            return reply.send({
                success: 1,
                data: data
            });
        } catch (error: any) {
            console.error('Error fetching file notes:', error);
            return reply.code(500).send({
                success: 0,
                message: 'Failed to fetch file notes'
            });
        }
    },

    // Get single file note by ID
    getFileNoteById: async (request: FastifyRequest | any, reply: FastifyReply) => {
        try {
            const { id } = request.params as any;

            const { data, error } = await (supabase as any)
                .from('file_notes')
                .select('*')
                .eq('id', id)
                .single();

            if (error) throw error;
            if (!data) {
                return reply.code(404).send({
                    success: 0,
                    message: 'File note not found'
                });
            }

            return reply.send({
                success: 1,
                data: data
            });
        } catch (error: any) {
            console.error('Error fetching file note:', error);
            return reply.code(500).send({
                success: 0,
                message: 'Failed to fetch file note'
            });
        }
    },

    // Update file note
    updateFileNote: async (request: FastifyRequest | any, reply: FastifyReply) => {
        try {
            const { id } = request.params as any;
            const updateData = request.body as any;

            // Add updated_at timestamp
            updateData.updated_at = new Date().toISOString();

            const { data, error } = await (supabase as any)
                .from('file_notes')
                .update(updateData)
                .eq('id', id)
                .select();

            if (error) throw error;
            if (!data || data.length === 0) {
                return reply.code(404).send({
                    success: 0,
                    message: 'File note not found'
                });
            }

            return reply.send({
                success: 1,
                data: data[0]
            });
        } catch (error: any) {
            console.error('Error updating file note:', error);
            return reply.code(400).send({
                success: 0,
                message: error.message || 'Failed to update file note'
            });
        }
    },

    // Delete file note
    deleteFileNote: async (request: FastifyRequest | any, reply: FastifyReply) => {
        try {
            const { id } = request.params as any;

            const { error } = await (supabase as any)
                .from('file_notes')
                .delete()
                .eq('id', id);

            if (error) throw error;

            return reply.send({
                success: 1,
                message: 'File note deleted successfully'
            });
        } catch (error: any) {
            console.error('Error deleting file note:', error);
            return reply.code(500).send({
                success: 0,
                message: 'Failed to delete file note'
            });
        }
    }
};

export default fileNoteController;
