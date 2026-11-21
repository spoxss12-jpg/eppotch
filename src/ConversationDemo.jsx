import { useEffect, useState } from "react";
import {
  MessageCircle,
  Mail,
  Phone,
  CalendarCheck,
  RotateCcw,
  Sparkles,
  CheckCircle2
} from "lucide-react";

const messages = [
  {
    type: "ai",
    text: "Hi James 👋 Thanks for reaching out about solar! Quick one — do you own the home, and roughly what's your monthly power bill?"
  },
  {
    type: "user",
    text: "Yes, we own it. Around $280/month."
  },
  {
    type: "ai",
    text: "Great! Based on what you've shared, your home may be a good candidate for solar. Our energy advisor has slots tomorrow at 10:00 AM or 3:30 PM. Which works better?"
  },
  {
    type: "user",
    text: "3:30 works."
  },
  {
    type: "ai",
    text: "Perfect! You're all set. I've reserved tomorrow at 3:30 PM with our energy advisor. You'll receive a confirmation shortly. Have a great evening! ☀️"
  }
];

const channels = [
  { name: "SMS", icon: MessageCircle },
  { name: "Email", icon: Mail },
  { name: "WhatsApp", icon: MessageCircle },
  { name: "AI Voice", icon: Phone }
];

export default function ConversationDemo() {
  const [activeChannel, setActiveChannel] = useState("SMS");
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (visibleCount >= messages.length) return;

    const timer = setTimeout(() => {
      setVisibleCount((count) => count + 1);
    }, visibleCount === 0 ? 800 : 1550);

    return () => clearTimeout(timer);
  }, [visibleCount]);

  const replay = () => setVisibleCount(0);

  return (
    <section className="conversation-section" id="ai-demo">
      <div className="conversation-wrap">
        <div className="conversation-heading">
          <div className="eyebrow">
            <span className="eyebrow-line"></span>
            SEE AUTOMATION IN ACTION
          </div>

          <h2>
            It's 9:47 PM.
            <br />
            Your team is asleep.
            <br />
            <span className="conversation-heading-accent">
              Your AI just booked a call.
            </span>
          </h2>

          <p>
            This illustrative conversation shows how an AI agent can qualify
            leads, answer questions and schedule appointments — even when
            your team is offline.
          </p>

          <div className="conversation-channels">
            {channels.map(({ name, icon: Icon }) => (
              <button
                type="button"
                key={name}
                className={`channel-button ${
                  activeChannel === name ? "active" : ""
                }`}
                onClick={() => setActiveChannel(name)}
                aria-pressed={activeChannel === name}
              >
                <Icon size={15} />
                {name}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="conversation-replay"
            onClick={replay}
          >
            <RotateCcw size={15} />
            Replay conversation
          </button>
        </div>

        <div className="conversation-demo-card">
          <div className="demo-card-top">
            <div className="demo-brand">
              <div className="demo-brand-icon">
                <Sparkles size={19} />
              </div>
              <div>
                <strong>SunPeak Solar · AI</strong>
                <span><i></i> Replies instantly</span>
              </div>
            </div>
            <span className="demo-channel-label">{activeChannel}</span>
          </div>

          <div className="demo-conversation">
            <div className="demo-timestamp">
              WEBSITE FORM · 9:47 PM
            </div>

            <div className="demo-form-event">
              <span>NEW LEAD RECEIVED</span>
              <p>Submitted form: “Need a quote for solar panels”</p>
            </div>

            <div className="demo-messages">
              {messages.slice(0, visibleCount).map((message, index) => (
                <div
                  key={index}
                  className={`demo-message-row ${message.type}`}
                >
                  {message.type === "ai" && (
                    <div className="demo-message-avatar">E</div>
                  )}
                  <div className="demo-message">
                    {message.text}
                  </div>
                </div>
              ))}
            </div>

            {visibleCount < messages.length && (
              <div className="demo-typing">
                <span></span>
                <span></span>
                <span></span>
                <small>AI is responding</small>
              </div>
            )}

            {visibleCount === messages.length && (
              <div className="demo-booking-confirmation">
                <div className="booking-check">
                  <CheckCircle2 size={21} />
                </div>
                <div>
                  <strong>Appointment booked</strong>
                  <span>Tomorrow · 3:30 PM</span>
                </div>
                <CalendarCheck size={20} />
              </div>
            )}
          </div>

          <div className="demo-card-bottom">
            <span><i></i> AI WORKFLOW ACTIVE</span>
            <span>{visibleCount}/{messages.length} MESSAGES</span>
          </div>
        </div>
      </div>

      <div className="conversation-disclaimer">
        Sample scenario for demonstration purposes. Actual workflows are
        customized to each business.
      </div>
    </section>
  );
}
