import { useEffect, useRef } from 'react';
import profileImg from '../assets/profile.png';
import resumePdf from '../assets/SurendraResume.pdf';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Download, Briefcase, Users, Code, GraduationCap, Target, Lightbulb, MonitorSmartphone, CheckCircle2 } from 'lucide-react';

const skills = [
  { name: 'React.js', level: 92, color: 'from-cyan-400 to-blue-500' },
  { name: 'Node.js & Express', level: 88, color: 'from-green-400 to-emerald-500' },
  { name: 'MongoDB', level: 85, color: 'from-green-400 to-teal-500' },
  { name: 'TypeScript', level: 80, color: 'from-blue-400 to-indigo-500' },
  { name: 'Next.js', level: 78, color: 'from-slate-300 to-slate-500' },
  { name: 'Tailwind CSS', level: 95, color: 'from-cyan-400 to-sky-500' },
  { name: 'PostgreSQL', level: 72, color: 'from-blue-400 to-blue-600' },
  { name: 'UI/UX Design', level: 75, color: 'from-purple-400 to-pink-500' },
];

const stats = [
  { icon: <Briefcase className="h-8 w-8" />, value: '1+', label: 'Years Experience' },
  { icon: <Code className="h-8 w-8" />, value: '10+', label: 'Projects Completed' },
  { icon: <Users className="h-8 w-8" />, value: '5+', label: 'Happy Clients' },
];

const timeline = [
  {
    year: '2026 - Present',
    title: 'Full Stack Developement Intern',
    company: 'Birllon AI Technologies',
    description: 'Leading a team of 4 developers to build modern React applications, improving overall performance by 40%.',
    icon: <Briefcase className="h-5 w-5" />
  },
  {
    year: '2021 - 2023',
    title: 'Freelance Web Developer',
    company: 'Self-Employed',
    description: 'Delivered 15+ full-stack projects for global clients, handling everything from UI/UX design to deployment.',
    icon: <Code className="h-5 w-5" />
  },
  {
    year: '2023 - 2027',
    title: 'B.Tech in Computer Science And Engineering (Data Science)',
    company: 'Rajeev Gandhi Memorial College Of Engineering Technology',
    description: 'Graduated with Honors. Specialized in Software Engineering and Human-Computer Interaction.',
    icon: <GraduationCap className="h-5 w-5" />
  }
];

const workflow = [
  {
    title: 'Discovery & Planning',
    description: 'Understanding your goals, target audience, and project requirements to create a solid technical roadmap.',
    icon: <Target className="h-7 w-7 text-primary-500" />
  },
  {
    title: 'UI/UX Design',
    description: 'Crafting intuitive, pixel-perfect designs and prototypes that align with your brand identity.',
    icon: <Lightbulb className="h-7 w-7 text-primary-500" />
  },
  {
    title: 'Development',
    description: 'Writing clean, scalable, and highly optimized code using modern frameworks and best practices.',
    icon: <MonitorSmartphone className="h-7 w-7 text-primary-500" />
  },
  {
    title: 'Testing & Launch',
    description: 'Rigorous QA testing across devices followed by a smooth deployment to production environments.',
    icon: <CheckCircle2 className="h-7 w-7 text-primary-500" />
  }
];

const SkillBar = ({ name, level, color, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start({
        width: `${level}%`,
        transition: { duration: 1.2, delay: index * 0.1, ease: 'easeOut' },
      });
    }
  }, [isInView, controls, level, index]);

  return (
    <div ref={ref} className="mb-6">
      <div className="flex justify-between mb-2">
        <span className="text-white font-medium text-sm">{name}</span>
        <span className="text-primary-500 font-bold text-sm">{level}%</span>
      </div>
      <div className="h-3 w-full bg-dark-900 rounded-full overflow-hidden border border-slate-700/50 shadow-inner">
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${color} shadow-[0_0_10px_rgba(56,189,248,0.5)]`}
          initial={{ width: 0 }}
          animate={controls}
        />
      </div>
    </div>
  );
};

const TimelineItem = ({ item, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div ref={ref} className="relative pl-8 sm:pl-32 py-6 group">
      {/* Timeline Line */}
      <div className="absolute left-4 sm:left-[7.5rem] top-0 bottom-0 w-1 bg-gradient-to-b from-accent-500/50 to-primary-500/20 group-last:bottom-auto group-last:h-full rounded-full"></div>

      {/* Glowing Timeline Dot/Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.4, delay: index * 0.2 }}
        className="absolute left-[-0.3rem] sm:left-[6.2rem] top-6 w-10 h-10 rounded-full bg-dark-900 border-2 border-accent-500 flex items-center justify-center text-accent-500 z-10 shadow-[0_0_15px_rgba(34,197,94,0.4)] group-hover:bg-accent-500 group-hover:text-dark-900 group-hover:scale-110 transition-all duration-300"
      >
        {item.icon}
      </motion.div>

      {/* Year Label (Desktop) */}
      <div className="hidden sm:block absolute left-0 top-8 w-20 text-right text-sm font-bold text-primary-500">
        {item.year}
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
        transition={{ duration: 0.5, delay: index * 0.2 + 0.1 }}
        className="glass-card p-6 border-l-4 border-l-primary-500 hover:-translate-y-1 transition-transform duration-300"
      >
        <div className="sm:hidden text-primary-500 text-sm font-bold mb-2">{item.year}</div>
        <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
        <h4 className="text-primary-300 font-medium mb-4">{item.company}</h4>
        <p className="text-slate-300 leading-relaxed">{item.description}</p>
      </motion.div>
    </div>
  );
};

const About = () => {
  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = resumePdf;
    link.download = 'SurendraResume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="pt-24 pb-20 min-h-screen relative overflow-hidden">
      {/* Global Background Glows */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>
      <div className="absolute bottom-40 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section 1: Hero & Bio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          {/* Vibrant Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative group"
          >
            {/* Glowing Backdrop */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>

            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-2xl border border-slate-700/50 bg-dark-800">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/20 to-transparent mix-blend-overlay z-10"></div>
              <img
                src={profileImg}
                alt="Profile"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            {/* Decorative blobs */}
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-primary-500/30 rounded-full blur-2xl -z-10"></div>
            <div className="absolute -top-8 -left-8 w-32 h-32 bg-blue-500/30 rounded-full blur-2xl -z-10"></div>
          </motion.div>

          {/* Bio Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7 space-y-6"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              About <span className="bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">Me</span>
            </h1>
            <h2 className="text-2xl font-semibold text-white leading-tight">
              Hi, I'm a passionate Full Stack Developer focused on building <span className="text-primary-500">digital experiences</span> that matter.
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed">
              With a strong foundation in modern web technologies, I specialize in building robust and scalable applications from the ground up. My approach combines clean, maintainable code with intuitive user experiences that wow.
            </p>
            <p className="text-slate-300 text-lg leading-relaxed">
              Whether you need a dynamic web app, a fast e-commerce platform, or a custom CMS, I have the skills and experience to bring your vision to life. I pride myself on communication, meeting deadlines, and delivering exceptional quality.
            </p>

            <div className="pt-6">
              <button onClick={handleDownloadResume} className="btn-primary flex items-center shadow-[0_0_15px_rgba(56,189,248,0.4)] hover:shadow-[0_0_25px_rgba(56,189,248,0.6)] transition-shadow">
                <Download className="mr-2 h-5 w-5" />
                Download Resume
              </button>
            </div>
          </motion.div>
        </div>

        {/* Section 2: Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-24 relative z-10">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 + 0.4 }}
              className="glass-card p-8 text-center flex flex-col items-center hover:-translate-y-2 hover:border-primary-500/50 transition-all duration-300 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="p-4 rounded-2xl bg-dark-900 border border-slate-700/50 text-primary-500 mb-4 group-hover:scale-110 group-hover:text-primary-300 transition-all duration-300 shadow-inner">
                {stat.icon}
              </div>
              <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-slate-400 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Section 3: Skills & Timeline Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-3xl font-bold text-white mb-8 flex items-center">
              <Code className="mr-3 h-8 w-8 text-primary-500 drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]" />
              Technical Arsenal
            </h3>
            <div className="glass-card p-8 hover:border-primary-500/30 transition-colors duration-300">
              {skills.map((skill, index) => (
                <SkillBar key={skill.name} {...skill} index={index} />
              ))}
            </div>
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-3xl font-bold text-white mb-8 flex items-center pl-8 sm:pl-32">
              <Briefcase className="mr-3 h-8 w-8 text-primary-500 drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]" />
              Experience
            </h3>
            <div>
              {timeline.map((item, index) => (
                <TimelineItem key={index} item={item} index={index} />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Section 4: Workflow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              My <span className="bg-gradient-to-r from-primary-500 to-blue-500 bg-clip-text text-transparent">Process</span>
            </h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">From concept to deployment, a proven methodology to deliver high-quality digital products.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflow.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-8 relative overflow-hidden group hover:-translate-y-2 hover:border-primary-500/50 transition-all duration-300"
              >
                {/* Glowing corner effect */}
                <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-primary-500/20 rounded-full blur-2xl group-hover:bg-primary-500/40 transition-colors duration-300"></div>

                <div className="mb-6 inline-flex items-center justify-center p-4 rounded-2xl bg-dark-900 border border-slate-700/50 shadow-inner group-hover:scale-110 transition-transform duration-300 relative z-10">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 relative z-10">{step.title}</h3>
                <p className="text-slate-400 leading-relaxed relative z-10">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default About;
