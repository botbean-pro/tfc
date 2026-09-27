import { Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import {
  Center,
  OrbitControls,
  useGLTF,
  Environment,
} from '@react-three/drei'

import {
  LiquefyProvider,
  GlassDock,
  DockItem,
  LiquidIconButton,
  LiquidTextField,
  LiquidButton,
} from '@liquefy-ui/react'

import {
  SparklesIcon,
  HomeIcon,
  UserIcon,
} from '@liquefy-ui/icons'

import '@liquefy-ui/react/styles.css'
import './App.css'

const modelUrl = `${import.meta.env.BASE_URL}Light-Bulb.glb`

const teamMembers = [
  {
    name: 'Maya Chen',
    role: 'Founder and product strategist',
    description: 'Shapes the club vision and turns ambitious ideas into useful products.',
    image: `${import.meta.env.BASE_URL}team/maya.jpg`,
  },
  {
    name: 'Ethan Brooks',
    role: 'Community lead',
    description: 'Builds the conversations, rituals, and connections that keep founders moving.',
    image: `${import.meta.env.BASE_URL}team/ethan.jpg`,
  },
  {
    name: 'Ava Williams',
    role: 'Design director',
    description: 'Makes the club feel clear, human, and memorable across every touchpoint.',
    image: `${import.meta.env.BASE_URL}team/ava.jpg`,
  },
  {
    name: 'Noah Patel',
    role: 'Venture partner',
    description: 'Helps early teams pressure-test their thinking and find their next unlock.',
    image: `${import.meta.env.BASE_URL}team/noah.jpg`,
  },
  {
    name: 'Lena Ortiz',
    role: 'Operations lead',
    description: 'Creates the calm systems that let the people and the work take center stage.',
    image: `${import.meta.env.BASE_URL}team/lena.jpg`,
  },
  {
    name: 'Julian Reed',
    role: 'Technology partner',
    description: 'Brings technical clarity to prototypes, platforms, and the path to scale.',
    image: `${import.meta.env.BASE_URL}team/julian.jpg`,
  },
]

function Model() {
  const { scene } = useGLTF(modelUrl)

  return (
    <Center>
      <primitive object={scene} scale={40} />
    </Center>
  )
}

useGLTF.preload(modelUrl)

function App() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [teamOpen, setTeamOpen] = useState(false)
  const [signupOpen, setSignupOpen] = useState(false)
  const [selectedMember, setSelectedMember] = useState(null)
  const [signupData, setSignupData] = useState({
    firstName: '',
    lastName: '',
    className: '',
    section: '',
    admissionNumber: '',
    skills: '',
  })

  useEffect(() => {
    const updateScrollProgress = () => {
      setScrollProgress(Math.min(window.scrollY / 520, 1))
    }

    updateScrollProgress()
    window.addEventListener('scroll', updateScrollProgress, { passive: true })

    return () => window.removeEventListener('scroll', updateScrollProgress)
  }, [])

  const logoStyle = {
    left: `${50 + ((88 / window.innerWidth) * 100 - 50) * scrollProgress}%`,
    top: `${50 + ((88 / window.innerHeight) * 100 - 50) * scrollProgress}%`,
    transform: `translate(-50%, -50%) scale(${1 - scrollProgress * 0.75})`,
  }

  return (
    <LiquefyProvider theme="dark" wobbliness={0.25}>
      <div className="scene">

        <div className="brand-mark" style={logoStyle}>
          <span className="brand-mark-circle" />
          <img src="/logo.svg" alt="The Founders Club" />
        </div>

        {/* 3D MODEL */}
        <Canvas className="scene-canvas" camera={{ position: [2.2, 1.5, 2.2], fov: 38 }}>
          <Suspense fallback={null}>
            <Environment preset="studio" />
          </Suspense>

          <ambientLight intensity={1.4} />
          <directionalLight position={[3, 4, 2]} intensity={2.5} />
          <pointLight position={[-2, 1, 3]} intensity={20} distance={8} />

          <Suspense fallback={null}>
            <Model />
          </Suspense>

          <OrbitControls enableDamping enableZoom={false} enablePan={false} />
        </Canvas>

        {/* LIQUEFY GLASS DOCK */}
        <div className="dock-position dark-blue-dock">
          <GlassDock>
            <DockItem
              icon={<HomeIcon />}
              label="Home"
              active={!teamOpen && !signupOpen}
              onClick={() => {
                setTeamOpen(false)
                setSignupOpen(false)
              }}
            />
            <DockItem
              icon={<SparklesIcon />}
              label="Sign up"
              active={signupOpen}
              onClick={() => {
                setTeamOpen(false)
                setSignupOpen(true)
              }}
            />
            <DockItem
              icon={<UserIcon />}
              label="Team"
              active={teamOpen && !signupOpen}
              onClick={() => {
                setSignupOpen(false)
                setTeamOpen(true)
              }}
            />
          </GlassDock>
        </div>

        {teamOpen && (
          <section className="team-view" aria-labelledby="team-title">
            <div className="team-header">
              <div>
                <p className="team-kicker">The people behind the ideas</p>
                <h1 id="team-title">TEAM</h1>
              </div>
            </div>

            <div className="team-grid">
              {teamMembers.map((member) => (
                <button
                  className="team-card"
                  key={member.name}
                  type="button"
                  onClick={() => setSelectedMember(member)}
                >
                  <img src={member.image} alt={`${member.name}, ${member.role}`} />
                  <span className="team-card-copy">
                    <strong>{member.name}</strong>
                    <small>{member.role}</small>
                    <span>{member.description}</span>
                  </span>
                </button>
              ))}
            </div>

            {selectedMember && (
              <div className="person-expanded" role="dialog" aria-modal="true" aria-labelledby="person-name">
                <button className="person-backdrop" type="button" aria-label="Close person details" onClick={() => setSelectedMember(null)} />
                <article className="person-panel">
                  <LiquidIconButton
                    label="Close person details"
                    shape="circle"
                    size="sm"
                    type="button"
                    onClick={() => setSelectedMember(null)}
                  >
                    <span aria-hidden="true">×</span>
                  </LiquidIconButton>
                  <img src={selectedMember.image} alt={`${selectedMember.name}, ${selectedMember.role}`} />
                  <div>
                    <p>{selectedMember.role}</p>
                    <h2 id="person-name">{selectedMember.name}</h2>
                    <span>{selectedMember.description}</span>
                  </div>
                </article>
              </div>
            )}
          </section>
        )}

        {signupOpen && (
          <section className="signup-view" aria-labelledby="signup-title">
            <div className="signup-content">
              <p className="team-kicker">Join The Founders Club</p>
              <h1 id="signup-title">SIGN UP</h1>
              <p className="signup-intro">Tell us a little about yourself to enter the club.</p>
              <form
                className="signup-form"
                onSubmit={(event) => {
                  event.preventDefault()
                }}
              >
                <LiquidTextField
                  label="First name"
                  name="firstName"
                  value={signupData.firstName}
                  onChange={(event) => setSignupData({ ...signupData, firstName: event.target.value })}
                  required
                />
                <LiquidTextField
                  label="Last name"
                  name="lastName"
                  value={signupData.lastName}
                  onChange={(event) => setSignupData({ ...signupData, lastName: event.target.value })}
                  required
                />
                <LiquidTextField
                  label="Class"
                  name="className"
                  value={signupData.className}
                  onChange={(event) => setSignupData({ ...signupData, className: event.target.value })}
                  required
                />
                <LiquidTextField
                  label="Section"
                  name="section"
                  value={signupData.section}
                  onChange={(event) => setSignupData({ ...signupData, section: event.target.value })}
                  required
                />
                <LiquidTextField
                  label="Admission number"
                  name="admissionNumber"
                  value={signupData.admissionNumber}
                  onChange={(event) => setSignupData({ ...signupData, admissionNumber: event.target.value })}
                  required
                />
                <LiquidTextField
                  label="Skills"
                  name="skills"
                  value={signupData.skills}
                  onChange={(event) => setSignupData({ ...signupData, skills: event.target.value })}
                  required
                />
                <LiquidButton className="signup-submit" type="submit" size="lg">
                  Enter
                </LiquidButton>
              </form>
            </div>
          </section>
        )}

        <footer className="site-footer">
          <strong>The Founders Club</strong>
          <div className="footer-links">
            <a className="contact-link" href="mailto:thefoundersclub@gmail.com">
              Contact us
            </a>
            <div className="social-links" aria-label="Social links">
              <LiquidIconButton
                label="X"
                shape="circle"
                size="sm"
                type="button"
                onClick={() => window.open('https://x.com', '_blank', 'noopener,noreferrer')}
              >
                <img
                  src="https://icon2.cleanpng.com/20240119/phb/transparent-x-icon-black-and-white-x-in-the-1710888893456.webp"
                  alt=""
                />
              </LiquidIconButton>
              <LiquidIconButton
                label="Facebook"
                shape="circle"
                size="sm"
                type="button"
                onClick={() => window.open('https://www.facebook.com', '_blank', 'noopener,noreferrer')}
              >
                <img
                  src="https://i.pinimg.com/564x/63/a2/31/63a231592efca78f2bcbc02267eb37be.jpg"
                  alt=""
                />
              </LiquidIconButton>
              <LiquidIconButton
                label="GitHub"
                shape="circle"
                size="sm"
                type="button"
                onClick={() => window.open('https://github.com', '_blank', 'noopener,noreferrer')}
              >
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6kIUqnCncK_FuMMJcEZLfBhTwJZW6-FjeCC8cvBy57v3i3mJSdO2oyI3P&s=10"
                  alt=""
                />
              </LiquidIconButton>
            </div>
          </div>
        </footer>

      </div>
    </LiquefyProvider>
  )
}

export default App