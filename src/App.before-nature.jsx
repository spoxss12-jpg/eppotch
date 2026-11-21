import { useState, useEffect } from "react";
import {
  ArrowUpRight,
  Bot,
  Workflow,
  MessageCircle,
  Database,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Clock3,
  Send,
  Menu,
  X,
  ChevronDown
} from "lucide-react";
import "./App.css";

const services = [
  {
    icon: Bot,
    number: "01",
    title: "AI Chatbots",
    description: "Intelligent assistants that answer questions, qualify prospects and support customers around the clock."
  },
  {
    icon: Workflow,
    number: "02",
    title: "Business Automation",
    description: "Connect your tools and automate repetitive tasks, so your team can focus on meaningful work."
  },
  {
    icon: MessageCircle,
    number: "03",
    title: "WhatsApp Automation",
    description: "Automatically respond to enquiries, follow up with leads and keep conversations moving."
  },
  {
    icon: Database,
    number: "04",
    title: "CRM & Lead Management",
    description: "Capture, organise and track leads with automated workflows that help prevent missed opportunities."
  }
];

const steps = [
  {
    number: "01",
    title: "Understand",
    description: "We learn how your business works and identify where automation can make the biggest difference."
  },
  {
    number: "02",
    title: "Build",
    description: "We design and implement a solution around your actual processes, tools and goals."
  },
  {
    number: "03",
    title: "Improve",
    description: "We test, refine and support your automation as your business grows."
  }
];

function App() {
  useEffect(() => {
    const elements = document.querySelectorAll(
      ".intro-inner, .services-section, .feature-inner, .process-section, .contact-inner, .service-card, .process-card"
    );

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    elements.forEach((element) => {
      element.classList.add("reveal-on-scroll");
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState("");

  const updateForm = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  };

  const submitForm = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setFormStatus("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong.");
      }

      setFormStatus("success");
      setForm({
        name: "",
        email: "",
        phone: "",
        company: "",
        service: "",
        message: ""
      });
    } catch (error) {
      setFormStatus(error.message || "Unable to send your enquiry. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell">
      <div className="announcement">
        <span className="announcement-dot"></span>
        BUILDING SMARTER BUSINESS SYSTEMS
        <span className="announcement-divider">/</span>
        <span>AI • AUTOMATION • GROWTH</span>
      </div>

      <header className="navbar">
        <a className="brand" href="#home" onClick={closeMenu}>
          <span className="brand-mark">E</span>
          <span>eppotch<span className="brand-period">.</span></span>
        </a>

        <nav className={menuOpen ? "nav-links nav-open" : "nav-links"}>
          <a href="#services" onClick={closeMenu}>Services</a>
          <a href="#process" onClick={closeMenu}>How it works</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#contact" onClick={closeMenu} className="mobile-contact">Let's talk <ArrowUpRight size={15} /></a>
        </nav>

        <a href="#contact" className="nav-cta">
          Let's talk <ArrowUpRight size={16} />
        </a>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      <main>
        <section className="hero section-wrap" id="home">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="eyebrow-line"></span>
              EPPOTCH AI SYSTEMS
            </div>

            <h1>
              Make your business
              <br />
              work <span className="gradient-text">smarter.</span>
            </h1>

            <p className="hero-description">
              We build intelligent AI systems and business automations that
              help you save time, capture more leads and grow without adding
              unnecessary complexity.
            </p>

            <div className="hero-actions">
              <a href="#contact" className="button-primary">
                Build your system <ArrowUpRight size={18} />
              </a>
              <a href="#services" className="button-secondary">
                Explore services <span>↓</span>
              </a>
            </div>

            <div className="hero-trust">
              <div className="trust-icon"><ShieldCheck size={17} /></div>
              <span>Built around your business. Designed to scale.</span>
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-glow"></div>
            <div className="visual-grid"></div>

            <div className="orbit orbit-one"></div>
            <div className="orbit orbit-two"></div>

            <div className="system-card">
              <div className="system-card-top">
                <div className="system-brand">
                  <span className="system-logo"><Sparkles size={17} /></span>
                  <div>
                    <strong>eppotch systems</strong>
                    <small>INTELLIGENT WORKFLOW</small>
                  </div>
                </div>
                <span className="live-status"><i></i> ACTIVE</span>
              </div>

              <div className="system-center">
                <div className="system-core">
                  <div className="core-ring"></div>
                  <Sparkles size={35} />
                </div>
                <span className="core-label">AI ENGINE</span>
              </div>

              <div className="system-flow">
                <div className="flow-node">
                  <MessageCircle size={17} />
                  <span>New enquiry</span>
                  <CheckCircle2 size={15} className="flow-check" />
                </div>
                <div className="flow-connector"><span></span></div>
                <div className="flow-node">
                  <Bot size={17} />
                  <span>AI qualification</span>
                  <CheckCircle2 size={15} className="flow-check" />
                </div>
                <div className="flow-connector"><span></span></div>
                <div className="flow-node">
                  <Database size={17} />
                  <span>CRM updated</span>
                  <CheckCircle2 size={15} className="flow-check" />
                </div>
              </div>

              <div className="system-footer">
                <span><i></i> Workflow running</span>
                <span>EFFICIENCY MODE</span>
              </div>
            </div>

            <div className="floating-card floating-card-top">
              <span className="floating-icon"><Zap size={16} /></span>
              <div>
                <strong>Less manual work</strong>
                <small>More time to grow</small>
              </div>
            </div>

            <div className="floating-card floating-card-bottom">
              <span className="floating-icon"><Clock3 size={16} /></span>
              <div>
                <strong>Always available</strong>
                <small>Systems that keep moving</small>
              </div>
            </div>

            <div className="visual-caption">DESIGNED FOR WHAT'S NEXT <span>↗</span></div>
          </div>

          <div className="hero-bottom">
            <span>SCROLL TO EXPLORE</span>
            <div className="scroll-line"></div>
            <span>01 — 04</span>
          </div>
        </section>

        <section className="intro-strip" id="about">
          <div className="section-wrap intro-inner">
            <span className="section-kicker">THE EPPOTCH APPROACH</span>
            <p>
              Technology should move your business forward —
              <span> not keep you busy doing repetitive work.</span>
            </p>
            <div className="intro-symbol"><ArrowUpRight size={25} /></div>
          </div>
        </section>

        <section className="services-section section-wrap" id="services">
          <div className="section-heading">
            <div>
              <div className="eyebrow"><span className="eyebrow-line"></span> WHAT WE DO</div>
              <h2>Less busywork.<br /><span className="muted-heading">More business.</span></h2>
            </div>
            <p>
              Practical AI and automation solutions that connect your tools,
              simplify your operations and create better customer experiences.
            </p>
          </div>

          <div className="services-grid">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <a className="service-card" href="#contact" key={service.number}>
                  <div className="service-card-top">
                    <span className="service-icon"><Icon size={22} /></span>
                    <span className="service-number">{service.number}</span>
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <div className="service-link">
                    Discuss this service <ArrowUpRight size={16} />
                  </div>
                </a>
              );
            })}
          </div>
        </section>

        <section className="feature-section">
          <div className="section-wrap feature-inner">
            <div className="feature-visual">
              <div className="feature-orb"><Sparkles size={42} /></div>
              <div className="feature-ring feature-ring-one"></div>
              <div className="feature-ring feature-ring-two"></div>
              <div className="feature-label feature-label-one">THINK</div>
              <div className="feature-label feature-label-two">CONNECT</div>
              <div className="feature-label feature-label-three">AUTOMATE</div>
            </div>

            <div className="feature-copy">
              <div className="eyebrow"><span className="eyebrow-line"></span> BUILT FOR REAL WORK</div>
              <h2>Your processes.<br /><span className="gradient-text">Reimagined.</span></h2>
              <p>
                No one-size-fits-all systems. We focus on the work that slows
                your business down, then build a practical solution around it.
              </p>
              <ul className="feature-list">
                <li><CheckCircle2 size={18} /> Reduce repetitive manual tasks</li>
                <li><CheckCircle2 size={18} /> Respond to leads faster</li>
                <li><CheckCircle2 size={18} /> Connect your existing tools</li>
                <li><CheckCircle2 size={18} /> Build systems that can grow with you</li>
              </ul>
              <a href="#contact" className="text-link">Let's discuss your workflow <ArrowUpRight size={17} /></a>
            </div>
          </div>
        </section>

        <section className="process-section section-wrap" id="process">
          <div className="section-heading">
            <div>
              <div className="eyebrow"><span className="eyebrow-line"></span> THE PROCESS</div>
              <h2>From idea to<br /><span className="muted-heading">intelligent action.</span></h2>
            </div>
            <p>
              A straightforward process that keeps your goals at the centre
              of every system we build.
            </p>
          </div>

          <div className="process-grid">
            {steps.map((step) => (
              <div className="process-card" key={step.number}>
                <span className="process-number">{step.number}</span>
                <div className="process-line"></div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="section-wrap contact-inner">
            <div className="contact-copy">
              <div className="eyebrow"><span className="eyebrow-line"></span> START A CONVERSATION</div>
              <h2>Let's make<br />work <span className="gradient-text">work better.</span></h2>
              <p>
                Tell us what you're trying to improve. We'll explore how AI
                and automation could help your business move forward.
              </p>

              <div className="contact-points">
                <div><CheckCircle2 size={18} /> No-obligation conversation</div>
                <div><CheckCircle2 size={18} /> Solutions built around your needs</div>
                <div><CheckCircle2 size={18} /> Clear, practical next steps</div>
              </div>

              <div className="contact-email">
                <span>EMAIL</span>
                <a href="mailto:hello@eppotch.com">hello@eppotch.com <ArrowUpRight size={15} /></a>
              </div>
            </div>

            <form className="contact-form" onSubmit={submitForm}>
              <div className="form-heading">
                <span>PROJECT ENQUIRY</span>
                <span className="form-required">* REQUIRED FIELDS</span>
              </div>

              <div className="form-row">
                <label>
                  Your name *
                  <input
                    name="name"
                    value={form.name}
                    onChange={updateForm}
                    placeholder="John Smith"
                    required
                    maxLength="120"
                  />
                </label>
                <label>
                  Email address *
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={updateForm}
                    placeholder="john@company.com"
                    required
                    maxLength="254"
                  />
                </label>
              </div>

              <div className="form-row">
                <label>
                  Phone / WhatsApp
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={updateForm}
                    placeholder="+91 00000 00000"
                    maxLength="40"
                  />
                </label>
                <label>
                  Company
                  <input
                    name="company"
                    value={form.company}
                    onChange={updateForm}
                    placeholder="Your company"
                    maxLength="120"
                  />
                </label>
              </div>

              <label>
                What are you looking for?
                <span className="select-wrap">
                  <select name="service" value={form.service} onChange={updateForm}>
                    <option value="">Select a service</option>
                    <option>AI Chatbots</option>
                    <option>Business Automation</option>
                    <option>WhatsApp Automation</option>
                    <option>CRM & Lead Management</option>
                    <option>Custom AI Solution</option>
                    <option>Not sure yet</option>
                  </select>
                  <ChevronDown size={17} />
                </span>
              </label>

              <label>
                Tell us about your project
                <textarea
                  name="message"
                  value={form.message}
                  onChange={updateForm}
                  placeholder="What would you like to automate or improve?"
                  rows="4"
                  maxLength="3000"
                ></textarea>
              </label>

              <button className="button-primary form-submit" type="submit" disabled={submitting}>
                {submitting ? "Sending enquiry..." : "Send enquiry"}
                <Send size={17} />
              </button>

              {formStatus === "success" && (
                <div className="form-message success-message">
                  <CheckCircle2 size={18} />
                  Your enquiry has been received. We'll be in touch.
                </div>
              )}

              {formStatus && formStatus !== "success" && (
                <div className="form-message error-message">{formStatus}</div>
              )}

              <p className="form-privacy">Your information is used only to respond to your enquiry.</p>
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="section-wrap footer-main">
          <a className="brand footer-brand" href="#home">
            <span className="brand-mark">E</span>
            <span>eppotch<span className="brand-period">.</span></span>
          </a>
          <p>Intelligent systems.<br />Better ways to work.</p>
          <a href="#home" className="back-top">BACK TO TOP ↑</a>
        </div>
        <div className="section-wrap footer-bottom">
          <span>© {new Date().getFullYear()} Eppotch AI Systems.</span>
          <span>BUILT FOR WHAT'S NEXT.</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
