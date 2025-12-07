// Author: Aicha El Hali
// New modern portfolio-style Imprint/About Me page

export default function ImprintPage() {
  return (
    <section style={{ padding: "0px" }}>
      
      {/* HERO TITLE */}
      <h1
        style={{
          fontSize: "3.8rem",
          fontWeight: "700",
          textAlign: "center",
          marginBottom: "60px",
          marginTop: "40px",
          color: "#f2a54a",
          letterSpacing: "3px",
        }}
      >
        ABOUT ME
      </h1>

      <style>{`
        @keyframes floatCard {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
      `}</style>

      {/* OUTER WRAPPER */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "55px",
          borderRadius: "32px",
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.03) 100%)",
          backdropFilter: "blur(22px) saturate(180%)",
          WebkitBackdropFilter: "blur(22px) saturate(180%)",
          border: "1px solid rgba(242, 165, 74, 0.35)",
          boxShadow:
            "0 20px 55px rgba(0,0,0,0.55), 0 0 35px rgba(242,165,74,0.12)",
          display: "grid",
          gridTemplateColumns: "440px 1fr",
          gap: "60px",
          alignItems: "center",
          animation: "floatCard 6s ease-in-out infinite",
        }}
      >
        {/* IMAGE */}
        <img
          src="/images/me.JPG"
          alt="Aicha El Hali"
          style={{
            width: "100%",
            height: "600px",
            objectFit: "cover",
            borderRadius: "22px",
            border: "1px solid rgba(242,165,74,0.25)",
            boxShadow:
              "0 12px 40px rgba(0,0,0,0.55), 0 0 25px rgba(242,165,74,0.20)",
          }}
        />

        {/* RIGHT SIDE CONTENT */}
        <div>
          {/* INTRO */}
          <h2
            style={{
              fontSize: "2.3rem",
              fontWeight: "700",
              marginBottom: "20px",
            }}
          >
            Hi, I’m Aicha 👋
          </h2>

          <p
            style={{
              marginBottom: "24px",
              color: "#d0d0d0",
              fontSize: "1.1rem",
              lineHeight: "1.7",
              maxWidth: "620px",
            }}
          >
            A creative and design-driven computer science student with a passion
            for modern web technologies, aesthetics and interaction design.
            I love creating meaningful digital experiences that combine logic,
            visual identity and usability.
          </p>

          {/* DETAILS */}
          <div
            style={{
              background: "rgba(255,255,255,0.03)",
              borderRadius: "14px",
              padding: "18px 22px",
              marginBottom: "30px",
              lineHeight: "1.9",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            }}
          >
            <p><strong>Name:</strong> Aicha El Hali</p>
            <p><strong>Course:</strong> Computer Science and Design (B.Sc.)</p>
            <p><strong>Email:</strong> aicha.el_hali@hm.edu</p>
            <p><strong>Semester:</strong> 3rd Semester</p>
          </div>

          {/* DISCLAIMER */}
          <p
            style={{
              color: "#aaa",
              fontSize: "0.95rem",
              maxWidth: "600px",
              marginBottom: "40px",
              lineHeight: "1.6",
            }}
          >
            This website is a student project for learning modern development
            with Next.js. All student data is generated via the Random User API
            and does not represent real individuals.
          </p>

          {/* STATS */}
          <div
            style={{
              display: "flex",
              gap: "60px",
              fontWeight: "700",
              fontSize: "1.6rem",
              color: "#f2a54a",
            }}
          >
            <div>
              3+ 
              <div style={{ color: "#ccc", fontSize: "0.9rem" }}>Semesters</div>
            </div>

            <div>
              10+
              <div style={{ color: "#ccc", fontSize: "0.9rem" }}>Projects</div>
            </div>

            <div>
              20+
              <div style={{ color: "#ccc", fontSize: "0.9rem" }}>Design Works</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}