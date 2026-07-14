const pool = require('../config/db');
const { v4: uuidv4 } = require('uuid');

const createComment = async (req, res) => {

    try {

        const {
            project_id,
            user_id,
            comment_text,
            parent_comment_id
        } = req.body;

        const result = await pool.query(
            `
            INSERT INTO community_comments
            (
                id,
                project_id,
                user_id,
                comment_text,
                parent_comment_id
            )
            VALUES
            (
                $1,$2,$3,$4,$5
            )
            RETURNING *;
            `,
            [
                uuidv4(),
                project_id,
                user_id,
                comment_text,
                parent_comment_id || null
            ]
        );

        res.status(201).json({
            success: true,
            data: result.rows[0]
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const getProjectComments = async (req, res) => {

    try {

        const { projectId } = req.params;

        const result = await pool.query(
            `
            SELECT *
            FROM community_comments
            WHERE project_id = $1
            AND is_deleted = FALSE
            ORDER BY created_at ASC;
            `,
            [projectId]
        );

        res.json({
            success: true,
            count: result.rows.length,
            data: result.rows
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const updateComment = async (req, res) => {

    try {

        const { id } = req.params;
        const { comment_text } = req.body;

        const result = await pool.query(
            `
            UPDATE community_comments
            SET
                comment_text = $1,
                is_edited = TRUE,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $2
            RETURNING *;
            `,
            [comment_text, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Comment not found."
            });
        }

        res.json({
            success: true,
            message: "Comment updated successfully.",
            data: result.rows[0]
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const deleteComment = async (req, res) => {

    try {

        const { id } = req.params;

        const result = await pool.query(
            `
            UPDATE community_comments
            SET
                is_deleted = TRUE,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $1
            RETURNING *;
            `,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Comment not found."
            });
        }

        res.json({
            success: true,
            message: "Comment deleted successfully."
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    createComment,
    getProjectComments,
    updateComment,
    deleteComment
};