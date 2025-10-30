import TelegramBot from "node-telegram-bot-api";

// === CONFIG ===
const TOKEN = "7994221516:AAHYVXGfMlSbsQs1H5rELlbWnFPzD7_D4cE"; // replace with your actual bot token
const WEBSITE = "https://the-official-ai-bubble-report.netlify.app/";

const bot = new TelegramBot(TOKEN, { polling: true });

// === MENU COMMANDS ===
const commands = [
  { command: "start", description: "Start the bot" },
  { command: "report", description: "View The AI Bubble Report" },
  { command: "poll", description: "Vote in the current AI market sentiment poll" },
  { command: "help", description: "Show available commands" },
];
bot.setMyCommands(commands);

// === HANDLERS ===

// /start — welcome message
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    `Welcome to *The AI Bubble Report* bot 📊\n\n` +
    `Use the menu below or type a command:\n\n` +
    `• /report — Open the AI Market Reality Report\n` +
    `• /poll — Participate in the live sentiment poll\n` +
    `• /help — List all commands`,
    {
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [
          [{ text: "🌐 Visit Website", url: WEBSITE }],
          [{ text: "📊 Take Poll", callback_data: "start_poll" }],
        ],
      },
    }
  );
});

// /report — link to site
bot.onText(/\/report/, (msg) => {
  bot.sendMessage(msg.chat.id,
    "Here’s the latest version of *The AI Bubble Report* — updated October 2025.",
    {
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [
          [{ text: "📈 Open Report", url: WEBSITE }]
        ],
      },
    }
  );
});

// /poll — trigger poll
bot.onText(/\/poll/, (msg) => {
  bot.sendPoll(
    msg.chat.id,
    "Do you think the current AI market is in a speculative bubble?",
    ["Yes, it’s overhyped", "No, it’s sustainable growth", "Uncertain / Too early to tell"],
    { is_anonymous: false }
  );
});

// /help — list commands
bot.onText(/\/help/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    `🧭 *Command List:*\n\n` +
    `/start — Introduction\n` +
    `/report — View AI Bubble Report website\n` +
    `/poll — Participate in AI sentiment poll\n` +
    `/help — Show this help menu`,
    { parse_mode: "Markdown" }
  );
});

bot.on("poll", (poll) => {
  console.log("Poll created:", poll.question);
});

// handle poll button press
bot.on("callback_query", (query) => {
  if (query.data === "start_poll") {
    bot.sendPoll(
      query.message.chat.id,
      "Do you think the current AI market is in a speculative bubble?",
      ["Yes, it’s overhyped", "No, it’s sustainable growth", "Uncertain / Too early to tell"],
      { is_anonymous: false }
    );
  }
});
