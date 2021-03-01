const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const authByRole = require('../../middleware/auth-by-role');
const Faq = require('../../models/faq');

// @route Get api/faq
// @desc Get list faq
// @access public
router.get('/', async (req, res) => {
    try {
        const faqs = await Faq.find({});

        res.json(faqs);
    }
    catch (e) {
        console.log(e);
        res.status(500).send('Server is error.');
    }
});

// @route Post api/faq
// @desc Create faq
// @access private
router.post('/', authByRole('admin'), [
    body('question', 'Question is required.').not().isEmpty(),
    body('answer', 'Answer is required.').not().isEmpty()
], async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const faq = await Faq.create({
            question: req.body.question,
            answer: req.body.answer
        });

        res.json(faq);
    }
    catch (e) {
        console.log(e);
        res.status(500).send('Server is error.');
    }
});

module.exports = router;