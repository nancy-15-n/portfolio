import { useEffect, useState } from "react";

const contactEmail = "n32562860@gmail.com";

const navigation = [
  ["About", "about"],
  ["Education", "education"],
  ["Skills", "skills"],
  ["Projects", "projects"],
  ["Experience", "experience"],
  ["Achievements", "achievements"],
] as const;

const skillGroups = [
  {
    title: "Languages",
    items: ["Python", "SQL", "JavaScript"],
  },
  {
    title: "Data & machine learning",
    items: [
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Scikit-learn",
      "Data Analysis",
      "Machine Learning",
      "Data Visualization",
      "EDA",
      "K-Means Clustering",
    ],
  },
  {
    title: "Web development",
    items: ["HTML", "CSS", "JavaScript"],
  },
  {
    title: "Tools & foundations",
    items: [
      "Git",
      "GitHub",
      "VS Code",
      "Jupyter Notebook",
      "Excel",
      "DSA",
      "DBMS",
      "Operating Systems",
      "Computer Networks",
      "OOP",
      "Data Mining",
    ],
  },
];

const credentials = [
  {
    name: "Python — Google",
    href: "https://www.coursera.org/account/accomplishments/verify/SEKFSEJUWWUN?utm_source=android&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=course",
  },
  {
    name: "DSA with Python — Coursera",
    href: "https://www.coursera.org/account/accomplishments/verify/J3VE82EJDFML?utm_source=android&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=course",
  },
  {
    name: "Programming Language — Coursera",
    href: "https://www.coursera.org/account/accomplishments/verify/PDRBF24YXD9L?utm_source=android&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=course",
  },
  {
    name: "Data Science — Udemy",
    href: "https://drive.google.com/file/d/1y0KDwfo7f-z5XYMmLrlsiz632AM8v6Dn/view?usp=drivesdk",
  },
  { name: "Full Stack — GeeksforGeeks", href: "https://lnkd.in/p/gbFePFh2" },
  {
    name: "Data Science & ML — GeeksforGeeks",
    href: "https://www.geeksforgeeks.org/certificate/bf6facef85ee0e9522463eb37f247d81",
  },
  {
    name: "Responsive Web Design — freeCodeCamp",
    href: "https://lnkd.in/p/ge4-yxNd",
  },
  {
    name: "AI for Everyone — DeepLearning.AI",
    href: "https://www.coursera.org/account/accomplishments/verify/VWEFFW5JVQP2?utm_source=android&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=course",
  },
  {
    name: "Foundations of Cybersecurity — Google",
    href: "https://www.coursera.org/account/accomplishments/verify/SR6NQDCFZLUD?utm_source=android&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=course",
  },
  {
    name: "Generative AI — AWS",
    href: "https://drive.google.com/file/d/1eg8Cn7agZmoGiiYQqHOG--wDFj1-zuJz/view?usp=drivesdk",
  },
  {
    name: "AI & ML — ISRO",
    href: "https://isrolms.iirs.gov.in/mod/customcert/view.php?id=4546",
  },
];

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <path d="M4.5 10h10m-4-4 4 4-4 4" />
    </svg>
  );
}

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [copyStatus, setCopyStatus] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [formStatus, setFormStatus] = useState("");

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? "dark" : "light";
  }, [darkMode]);

  useEffect(() => {
    const updateScrollState = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
      document.documentElement.style.setProperty("--scroll-progress", `${progress * 100}%`);
      setShowBackToTop(window.scrollY > 560);
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      window.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
      document.documentElement.style.removeProperty("--scroll-progress");
    };
  }, []);

  useEffect(() => {
    const sectionIds = ["home", ...navigation.map(([, id]) => id)];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visibleSections[0]) setActiveSection(visibleSections[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0, 0.1, 0.25, 0.5] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const revealTargets = document.querySelectorAll(
      ".skill-group, .project-card, .experience-item, .credential-grid > a",
    );
    if (!("IntersectionObserver" in window)) {
      revealTargets.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -7% 0px", threshold: 0.08 },
    );
    revealTargets.forEach((element) => {
      element.classList.add("reveal-on-scroll");
      observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactEmail);
      setCopyStatus("Email copied to clipboard.");
    } catch {
      setCopyStatus("Could not copy automatically. Use the email link instead.");
    }
  };

  const submitContactForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const subject = `Portfolio inquiry from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setFormStatus("Your email app should open with your message ready to send.");
  };

  return (
    <>
      <div className="scroll-progress" aria-hidden="true" />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="header-inner">
          <a className="brand" href="#home" aria-label="Nancy, back to top">
            <span className="brand-mark">N.</span>
            <span className="brand-name">Nancy<span className="brand-period">.</span></span>
          </a>
          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
          </button>
          <nav
            id="primary-navigation"
            className={`primary-nav${menuOpen ? " is-open" : ""}`}
            aria-label="Primary navigation"
          >
            {navigation.map(([label, id]) => (
              <a
                key={id}
                href={`#${id}`}
                aria-current={activeSection === id ? "location" : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            ))}
            <a className="nav-contact" href="#contact" onClick={() => setMenuOpen(false)}>
              Get in touch <ArrowIcon />
            </a>
          </nav>
          <button
            className="theme-toggle"
            type="button"
            aria-pressed={darkMode}
            onClick={() => setDarkMode((enabled) => !enabled)}
          >
            <span aria-hidden="true">{darkMode ? "☀" : "☾"}</span>
            {darkMode ? "Light mode" : "Dark mode"}
          </button>
        </div>
      </header>

      <main id="main">
        <section className="hero section-wrap" id="home" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow"><span className="status-dot" /> Computer Science · Data Science</p>
            <h1 id="hero-title">Nancy<br /><span>Sharma</span></h1>
            <p className="hero-role">Computer Science · Data Science · AI</p>
            <p className="hero-summary">
              Building thoughtful software and turning data into useful ideas.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">Explore my work <ArrowIcon /></a>
              <a className="text-link" href="#contact">Say hello <span aria-hidden="true">↗</span></a>
            </div>
            <div className="hero-location">
              <span className="location-icon" aria-hidden="true">⌖</span>
              Delhi, India <span className="separator">/</span> Open to opportunities
            </div>
          </div>
          <aside className="hero-card" aria-label="Portfolio highlights">
            <div className="card-orbit orbit-one" />
            <div className="card-orbit orbit-two" />
            <div className="hero-card-top"><span>PROFILE / 2026</span><span className="tiny-star">✳</span></div>
            <div className="hero-avatar" aria-hidden="true">N<span>.</span></div>
            <p className="hero-card-label">CURIOUS BY NATURE</p>
            <h2>Building at the<br /><span>intersection of</span><br />data &amp; technology.</h2>
            <div className="hero-card-bottom">
              <span>Python <i>·</i> ML <i>·</i> Analytics</span>
              <span className="card-arrow">↗</span>
            </div>
          </aside>
          <div className="hero-index" aria-hidden="true">01 — 06</div>
        </section>

        <section className="section-wrap about-section" id="about" aria-labelledby="about-title">
          <div className="section-heading">
            <p className="eyebrow">01 / ABOUT</p>
            <h2 id="about-title">A little<br /><span>about me.</span></h2>
            <div className="about-poster" aria-label="Nancy Sharma, Computer Science undergraduate in Haryana, India">
              <span className="poster-orbit poster-orbit-one" />
              <span className="poster-orbit poster-orbit-two" />
              <span className="poster-monogram">N<span>.</span></span>
              <span className="poster-caption">COMPUTER SCIENCE · 2023—2027</span>
              <span className="poster-location">HARYANA, INDIA</span>
            </div>
          </div>
          <div className="about-content">
            <p className="about-lead">
              I’m a Computer Science undergraduate with a soft spot for turning complex data into
              clear, useful experiences.
            </p>
            <p>
              My work spans Python, SQL, machine learning, data analysis, and web development.
              Through academic and internship projects, I’ve built AI- and data-driven applications
              from the ground up — and learned that the best solutions are the ones people can
              actually use.
            </p>
            <p>
              I’m currently seeking opportunities in Software Development, Data Analytics, and AI.
              I bring a thoughtful approach, a willingness to learn, and a steady focus on the
              details that make a product work.
            </p>
            <div className="contact-strip">
              <a className="profile-button" href={`mailto:${contactEmail}`}>Email Nancy <ArrowIcon /></a>
              <ExternalLink href="https://linkedin.com/in/nancy-s-778b59315">
                <span className="profile-button">LinkedIn <ArrowIcon /></span>
              </ExternalLink>
              <ExternalLink href="https://github.com/nancy-15-n">
                <span className="profile-button">GitHub <ArrowIcon /></span>
              </ExternalLink>
            </div>
          </div>
        </section>

        <section className="education-section" id="education" aria-labelledby="education-title">
          <div className="section-wrap">
            <div className="section-heading section-heading-row">
              <div><p className="eyebrow">02 / THE FOUNDATION</p><h2 id="education-title">Education<span>.</span></h2></div>
              <p className="section-intro">A foundation in computer science, sharpened by a focus on data.</p>
            </div>
            <div className="education-grid">
              <article className="education-feature">
                <div className="education-meta"><span>2023 — 2027</span><span className="education-dot">✳</span></div>
                <p className="eyebrow">BACHELOR OF TECHNOLOGY</p>
                <h3>Computer Science<br />&amp; Engineering</h3>
                <p className="school-name">Hindu College of Engineering</p>
                <p className="school-detail">DCRUST University</p>
                <div className="score-row"><span>CGPA</span><strong>7.93 <small>/ 10</small></strong></div>
                <div className="minor-row"><span>Minor specialization</span><span>Data Science <b>8.93 CGPA</b></span></div>
              </article>
              <div className="school-list">
                <article className="school-card">
                  <span className="school-years">SENIOR SECONDARY</span>
                  <h3>Model Sanskriti School</h3>
                  <p>Higher secondary education</p>
                  <strong>82<span>%</span></strong>
                </article>
                <article className="school-card">
                  <span className="school-years">SECONDARY</span>
                  <h3>Sunrise Public School</h3>
                  <p>Secondary education</p>
                  <strong>87<span>%</span></strong>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="section-wrap skills-section" id="skills" aria-labelledby="skills-title">
          <div className="section-heading section-heading-row">
            <div><p className="eyebrow">03 / MY TOOLKIT</p><h2 id="skills-title">Skills<span>.</span></h2></div>
            <p className="section-intro">Tools I use to explore an idea, find the signal, and make something useful.</p>
          </div>
          <div className="skills-grid">
            {skillGroups.map((group, index) => (
              <article className="skill-group" key={group.title}>
                <div className="skill-number">0{index + 1}</div>
                <h3>{group.title}</h3>
                <ul>
                  {group.items.map((skill) => <li key={skill}>{skill}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="projects-section" id="projects" aria-labelledby="projects-title">
          <div className="section-wrap">
            <div className="section-heading section-heading-row">
              <div><p className="eyebrow">04 / SELECTED WORK</p><h2 id="projects-title">Featured work<span>.</span></h2></div>
              <p className="section-intro">A selection of software, data, and AI projects.</p>
            </div>
            <div className="project-list">
              <article className="project-card project-featured">
                <div className="project-visual brt-visual" aria-hidden="true">
                  <div className="visual-top"><span>BRT / ANALYZER</span><span>01</span></div>
                  <div className="chart-bars"><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
                  <div className="chart-caption"><span>TRAIN MOVEMENT</span><span>DATA / INSIGHT</span></div>
                  <div className="visual-line" />
                </div>
                <div className="project-copy">
                  <div className="project-overline">DATA SCIENCE &amp; ML · CRIS</div>
                  <h3>BRT Analyzer</h3>
                  <p className="project-subtitle">Railway Bare Running Time &amp; Track Simulation Platform</p>
                  <p>
                    A full-stack analytics platform for railway operations. Processed large-scale
                    train movement and schedule datasets, and built preprocessing pipelines that
                    reduced repeated computation by 30–40%.
                  </p>
                  <div className="module-row"><span>Train-wise BRT</span><span>Section-wise BRT</span><span>Station layout</span><span>Data hub</span></div>
                  <div className="tag-row"><span>Python</span><span>FastAPI</span><span>React</span><span>Pandas</span><span>Scikit-learn</span><span>K-Means</span><span>GitHub</span></div>
                </div>
              </article>
              <article className="project-card">
                <div className="project-visual nexo-visual" aria-hidden="true">
                  <div className="visual-top"><span>NEXO / AI</span><span>02</span></div>
                  <div className="nexo-symbol"><span>n</span><i>✳</i></div>
                  <div className="voice-wave"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
                  <div className="chart-caption"><span>LISTEN</span><span>UNDERSTAND</span><span>RESPOND</span></div>
                </div>
                <div className="project-copy">
                  <div className="project-overline">DESKTOP APP · IKIGAI SCHOOL OF AI</div>
                  <h3>NEXO AI Virtual Assistant</h3>
                  <p>
                    A Python desktop assistant with voice and text commands. Integrated speech
                    recognition and text-to-speech to automate web search, app launching, media
                    control, and system commands.
                  </p>
                  <div className="tag-row"><span>Python</span><span>Tkinter</span><span>SpeechRecognition</span><span>PyAudio</span><span>pyttsx3</span></div>
                  <ExternalLink href="https://github.com/nancy-15-n/nexo_ai">
                    <span className="project-link">View repository <ArrowIcon /></span>
                  </ExternalLink>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="section-wrap experience-section" id="experience" aria-labelledby="experience-title">
          <div className="section-heading section-heading-row">
            <div><p className="eyebrow">05 / WHERE I’VE BEEN</p><h2 id="experience-title">Experience<span>.</span></h2></div>
            <p className="section-intro">Learning by building, collaborating, and putting ideas into practice.</p>
          </div>
          <div className="experience-list">
            <article className="experience-item">
              <div className="experience-date">JUL 2026 — PRESENT<span>NEW DELHI, INDIA</span></div>
              <div className="experience-body">
                <div className="experience-heading"><div><p className="project-overline">INTERNSHIP · DATA SCIENCE &amp; ML</p><h3>Centre for Railway Information Systems <span>(CRIS)</span></h3></div><span className="role-mark">↗</span></div>
                <p>Building the BRT Analyzer platform for railway bare running time and track simulation. Working across large-scale operational datasets, analytics workflows, and full-stack product development.</p>
                <div className="tag-row"><span>Python</span><span>FastAPI</span><span>React</span><span>Data analytics</span></div>
              </div>
            </article>
            <article className="experience-item">
              <div className="experience-date">MAY — JUL 2026<span>25 MAY — 6 JUL</span></div>
              <div className="experience-body">
                <div className="experience-heading"><div><p className="project-overline">AI &amp; DATA SCIENCE · SUMMER INTERNSHIP</p><h3>TI Infotech Pvt. Ltd.</h3></div><span className="role-mark">↗</span></div>
                <p>Completed a summer internship in the Oracle Department, contributing to AI and Data Science project work and tasks from May 25 to July 6, 2026.</p>
                <div className="tag-row"><span>AI</span><span>Data Science</span><span>Oracle Department</span></div>
              </div>
            </article>
            <article className="experience-item">
              <div className="experience-date">JUL — AUG 2025<span>6-WEEK TRAINING</span></div>
              <div className="experience-body">
                <div className="experience-heading"><div><p className="project-overline">DATA SCIENCE &amp; MACHINE LEARNING · TRAINING</p><h3>IKIGAI Lab <span>(Ikigai School of AI)</span></h3></div><span className="role-mark">↗</span></div>
                <p>Completed six weeks of summer training in Data Science and Machine Learning, conducted by IKIGAI Lab in collaboration with Hindu College of Engineering from July 14 to August 11, 2025.</p>
                <div className="tag-row"><span>Data Science</span><span>Machine Learning</span><span>IKIGAI Lab</span></div>
              </div>
            </article>
            <article className="experience-item">
              <div className="experience-date">COHORT 8<span>AI TRACK</span></div>
              <div className="experience-body">
                <div className="experience-heading"><div><p className="project-overline">PARTICIPANT · LEARNING PROGRAM</p><h3>Infosys Springboard Pragati Path</h3></div><span className="role-mark">↗</span></div>
                <p>Coursework in AI, Machine Learning, and Data Science. Applied Python and analytics in project-based exercises and completed hands-on data analysis and machine-learning assignments.</p>
              </div>
            </article>
          </div>
        </section>

        <section className="certifications-section" id="achievements" aria-labelledby="achievements-title">
          <div className="section-wrap">
            <div className="section-heading section-heading-row">
              <div><p className="eyebrow">06 / LEARNING &amp; RECOGNITION</p><h2 id="achievements-title">Achievements<span>.</span></h2></div>
              <p className="section-intro">Course certificates, training completions, and participation achievements across software, data, and AI.</p>
            </div>
            <div className="credential-grid">
              {credentials.map((credential, index) => (
                <ExternalLink key={credential.name} href={credential.href}>
                  <span className="credential-card">
                    <span className="credential-index">{String(index + 1).padStart(2, "0")}</span>
                    <span>{credential.name}</span>
                    <span className="credential-check" aria-hidden="true">↗</span>
                  </span>
                </ExternalLink>
              ))}
            </div>
          </div>
        </section>

        <section className="closing-section" id="contact" aria-labelledby="closing-title">
          <div className="section-wrap closing-inner">
            <div className="contact-copy">
              <p className="eyebrow">CONTACT · HARYANA, INDIA</p>
              <h2 id="closing-title">Have a project<br />in mind?</h2>
              <p className="contact-invitation">I’m exploring opportunities in Software Development, Data Analytics, and AI. I’d be glad to hear from you.</p>
              <div className="contact-actions">
                <button className="button button-light" type="button" onClick={copyEmail}>
                  {copyStatus ? "Copied" : "Copy email"}
                  <span aria-hidden="true">{copyStatus ? "✓" : "↗"}</span>
                </button>
                <a className="contact-email profile-button" href={`mailto:${contactEmail}`}>Email Nancy <ArrowIcon /></a>
              </div>
              <p className="copy-status" role="status" aria-live="polite">{copyStatus}</p>
              <div className="contact-socials" aria-label="Social profiles">
                <ExternalLink href="https://linkedin.com/in/nancy-s-778b59315">
                  <span className="profile-button">LinkedIn <ArrowIcon /></span>
                </ExternalLink>
                <ExternalLink href="https://github.com/nancy-15-n">
                  <span className="profile-button">GitHub <ArrowIcon /></span>
                </ExternalLink>
              </div>
            </div>
            <form className="contact-form" onSubmit={submitContactForm}>
              <label>
                Your name
                <input autoComplete="name" name="name" placeholder="How should I address you?" required />
              </label>
              <label>
                Email address
                <input autoComplete="email" name="email" placeholder="you@example.com" required type="email" />
              </label>
              <label>
                Message
                <textarea name="message" placeholder="Tell me a little about what you have in mind..." required rows={4} />
              </label>
              <button className="button button-light contact-submit" type="submit">
                Prepare message <ArrowIcon />
              </button>
              <p className="copy-status" role="status" aria-live="polite">{formStatus}</p>
            </form>
            <span className="closing-spark" aria-hidden="true">✳</span>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="section-wrap footer-inner">
          <a className="brand" href="#home"><span className="brand-mark">N.</span><span className="brand-name">Nancy<span className="brand-period">.</span></span></a>
          <p>Thank you for visiting! <span>© {new Date().getFullYear()} Nancy</span></p>
          <a className="back-top" href="#home">Back to top ↑</a>
        </div>
      </footer>
      {showBackToTop && (
        <a className="floating-top" href="#home" aria-label="Back to top">
          ↑
        </a>
      )}
    </>
  );
}

export default App;
