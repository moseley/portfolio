import { Heading, HStack, Tooltip, Text } from '@chakra-ui/react'
import { Glass } from '@components/UI/Background/Glass'
import {
  SiReact,
  SiNextDotJs,
  SiAmazonaws,
  SiAdobephotoshop,
  SiJavascript,
  SiTypescript,
  SiTailwindcss,
  SiWordpress,
  SiPhp,
  SiAdobexd,
  SiBootstrap,
  SiCss3,
  SiHtml5,
  SiExpo,
  SiFigma,
  SiGatsby,
  SiGithub,
  SiGit,
  SiGraphql,
  SiJest,
  SiMaterialUi,
  SiNetlify,
  SiNodeDotJs,
  SiNpm,
  SiPowershell,
  SiPrettier,
  SiServerless,
  SiRedux,
  SiVisualstudiocode,
  SiWindows,
  SiApple,
  SiLinux,
  SiYarn,
  SiMysql
} from 'react-icons/si'
import { IoLogoAmplify, IoLogoVercel } from 'react-icons/io5'
import * as React from 'react'

interface IconDisplayProps {
  label: string
  icon: React.ReactElement
}

interface ItemProps {
  id: string
  icon: React.ReactElement
}

interface IconRowProps {
  label?: string
  items: ItemProps[]
}

const IconDisplay = ({ label, icon }: IconDisplayProps) => {
  return (
    <Tooltip label={label} fontSize='md'>
      <span>{icon}</span>
    </Tooltip>
  )
}

const IconRow = ({ label, items }: IconRowProps) => {
  return (
    <>
      {label && <Text>{label}</Text>}
      <HStack fontSize='xl' spacing='1em' justify='center' p={2}>
        {items.map((i) => (
          <IconDisplay key={i.id} label={i.id} icon={i.icon} />
        ))}
      </HStack>
    </>
  )
}

const Languages = () => {
  const items: ItemProps[] = [
    { id: 'HTML5', icon: <SiHtml5 /> },
    { id: 'CSS3', icon: <SiCss3 /> },
    { id: 'JavaScript', icon: <SiJavascript /> },
    { id: 'TypeScript', icon: <SiTypescript /> },
    { id: 'GraphQL', icon: <SiGraphql /> },
    { id: 'NodeJS', icon: <SiNodeDotJs /> },
    { id: 'PHP', icon: <SiPhp /> },
    { id: 'SQL', icon: <SiMysql /> }
  ]
  return <IconRow items={items} />
}

const Frameworks = () => {
  const items: ItemProps[] = [
    { id: 'React', icon: <SiReact /> },
    { id: 'Next.js', icon: <SiNextDotJs /> },
    { id: 'Gatsby', icon: <SiGatsby /> },
    { id: 'React Native / Expo', icon: <SiExpo /> },
    { id: 'Redux', icon: <SiRedux /> },
    { id: 'AWS Amplify', icon: <IoLogoAmplify /> },
    { id: 'WordPress', icon: <SiWordpress /> }
  ]
  return <IconRow items={items} />
}

const Deployment = () => {
  const items: ItemProps[] = [
    { id: 'Amazon Web Services', icon: <SiAmazonaws /> },
    { id: 'Serverless', icon: <SiServerless /> },
    { id: 'Vercel', icon: <IoLogoVercel /> },
    { id: 'Netlify', icon: <SiNetlify /> },
    { id: 'GitHub Pages', icon: <SiGithub /> }
  ]
  return <IconRow items={items} />
}

const Design = () => {
  const items: ItemProps[] = [
    { id: 'Chakra UI / Tailwind CSS', icon: <SiTailwindcss /> },
    { id: 'Material UI', icon: <SiMaterialUi /> },
    { id: 'Bootstrap', icon: <SiBootstrap /> },
    { id: 'Adobe Photoshop', icon: <SiAdobephotoshop /> },
    { id: 'Adobe XD', icon: <SiAdobexd /> },
    { id: 'Figma', icon: <SiFigma /> }
  ]
  return <IconRow items={items} />
}

const Tools = () => {
  const items: ItemProps[] = [
    { id: 'macOS, iOS', icon: <SiApple /> },
    { id: 'Windows', icon: <SiWindows /> },
    { id: 'Linux', icon: <SiLinux /> },
    { id: 'Visual Studio Code', icon: <SiVisualstudiocode /> },
    { id: 'Terminal', icon: <SiPowershell /> },
    { id: 'Npm', icon: <SiNpm /> },
    { id: 'Yarn', icon: <SiYarn /> },
    { id: 'Prettier', icon: <SiPrettier /> },
    { id: 'Jest / React Testing Library', icon: <SiJest /> },
    { id: 'Git', icon: <SiGit /> }
  ]
  return <IconRow items={items} />
}

const Skills = () => {
  const brief = true
  return (
    <>
      <Glass my={2}>
        <Heading fontSize='2xl' py={2}>
          Skills, frameworks, tools&hellip;
        </Heading>
        <Languages />
        <Frameworks />
        <Deployment />
        <Design />
        {!brief && <Tools />}
      </Glass>
    </>
  )
}

export default Skills
