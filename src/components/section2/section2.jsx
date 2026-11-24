const cards = [
  {
    img: "https://plus.unsplash.com/premium_photo-1733306477044-bcc3c374da91?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    title: "Explore Your Opportunities",
    text: "Discover courses, internships, career paths, and skill-building opportunities that match your interests and abilities. Find new ways to learn, grow, and achieve your goals.",
    btn: "Explore Opportunities",
    btnColor: "bg-blue-500 text-white",
  },
  {
    img: "https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    title: "Discover Financial Support",
    text: "Explore scholarships, government schemes, education loans, and health support. Learn about available benefits and find assistance that suits your needs.",
    btn: "Find Support",
    btnColor: "bg-blue-500 text-white",
  },
  {
    img: "https://plus.unsplash.com/premium_photo-1743827754663-4bfa8fd7fb3c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    title: "Get Personalized Guidance",
    text: "Get recommendations based on your life stage, skills, interests, and goals. Discover useful resources and guidance to help you take your next step with confidence.",
    btn: "Get Guidance",
    btnColor: "bg-blue-500 text-white",
  },
];

export default function Section2() {
  return (
    <section className="bg-white px-7 py-40">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
        {cards.map((c) => (
          <div
            key={c.title}
            className="relative h-[480px] overflow-hidden rounded-3xl"
          >
            <img
              src={c.img}
              alt={c.title}
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-blue-900/50 to-transparent" />

            <div className="absolute bottom-0 z-10 w-full p-5 text-white">
              <h3 className="mb-2 text-2xl font-semibold leading-tight">
                {c.title}
              </h3>
              <p className="mb-4 text-sm leading-snug text-white/90">
                {c.text}
              </p>
              <button
                className={`flex w-full items-center justify-between rounded-full px-5 py-3 font-medium ${c.btnColor}`}
              >
                {c.btn}
                <span>→</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

