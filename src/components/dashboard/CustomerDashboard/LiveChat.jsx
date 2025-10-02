
export default function LiveChat() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center px-4 py-10 text-white">
      <div className="w-full max-w-xl bg-gray-900/60 backdrop-blur-md border border-gray-800 rounded-2xl shadow-2xl p-6 animate-fade-in">
        <h2 className="text-3xl font-extrabold text-center text-white mb-6 tracking-wide">
          💬 Chat Preview
        </h2>

        <div className="space-y-4">
          <ChatBubble text="Hi there! 👋" />
          <ChatBubble text="Soon you'll be able to chat directly with inspectors in real time." />
          <ChatBubble text="We're polishing the experience for you..." />
          <TypingBubble />
        </div>

        <div className="mt-10 text-center bg-gradient-to-r from-blue-800 via-blue-500 to-blue-900 py-4 px-6 rounded-xl shadow-md animate-pulse">
          <p className="text-white text-lg font-semibold">
            🚀 Coming Soon: Real-time Chat with Inspectors
          </p>
          <p className="text-white text-sm mt-1">
            We’re working on this feature, launching shortly!
          </p>
        </div>
      </div>
    </div>
  );
}

function ChatBubble({ text }) {
  return (
    <div className="flex justify-start animate-slide-up">
      <div className="max-w-[80%] bg-gray-800 text-white px-4 py-2 rounded-xl rounded-bl-none shadow-md text-sm">
        {text}
      </div>
    </div>
  );
}

function TypingBubble() {
  return (
    <div className="flex justify-start animate-slide-up">
      <div className="bg-gray-800 px-4 py-2 rounded-xl rounded-bl-none shadow-md flex space-x-1">
        <Dot />
        <Dot delay="150ms" />
        <Dot delay="300ms" />
      </div>
    </div>
  );
}

function Dot({ delay = "0ms" }) {
  return (
    <span
      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
      style={{ animationDelay: delay }}
    ></span>
  );
}