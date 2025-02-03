const SupportSession = require('../models/SupportSession');

// Fetch or create user's current session:
exports.getSession = async (req, res) => {
  try {
    let session = await SupportSession.findOne({ user: req.user.id });
    if (!session) {
      session = await SupportSession.create({
        user: req.user.id,
        messages: []
      });
    }
    res.json({ session });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const { message, sessionId } = req.body;
    if (!message) return res.status(400).json({ error: 'Message text is required' });

    // Find or create session
    let session = sessionId
      ? await SupportSession.findById(sessionId)
      : await SupportSession.findOne({ user: req.user.id });

    if (!session) {
      session = await SupportSession.create({
        user: req.user.id,
        messages: []
      });
    }

    // Push user message
    session.messages.push({ role: 'user', text: message });

    // Generate a basic static response (placeholder for actual chatbot logic)
    const chatbotResponse = 'Hello from the support chatbot!';

    // Store assistant response
    session.messages.push({ role: 'assistant', text: chatbotResponse });

    await session.save();
    res.json({ response: chatbotResponse, session });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};