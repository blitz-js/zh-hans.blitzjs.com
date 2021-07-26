import {useState} from "react"

import {CodeWindow} from "@/components/CodeWindow"
import {useIsDesktop} from "@/hooks/useIsDesktop"

import tokenize from "../../macros/tokenize.macro.js"

const pageTokenized = tokenize.jsx(
  `// app/pages/projects/new.tsx
import { Link, Routes, useRouter, useMutation, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
// 注意我们是如何直接导入服务端函数的
import createProject, {CreateProject} from "app/projects/mutations/createProject"
import { ProjectForm } from "app/projects/components/ProjectForm"

const NewProjectPage: BlitzPage = () => {
  const router = useRouter()
  const [createProjectMutation] = useMutation(createProject)

  return (
    <div>
      <h1>Create New Project</h1>

      <ProjectForm
        submitText="Create Project"
        schema={CreateProject}
        onSubmit={async (values) => {
          // 这里和直接调用服务端函数是等价的
          const project = await createProjectMutation(values)
          // 注意 Blitz 提供的用来路由的 'Routes' 对象
          router.push(Routes.ProjectsPage({projectId: project.id}}))
        }}
      />
    </div>
  )
}

NewProjectPage.authenticate = true
NewProjectPage.getLayout = (page) => <Layout>{page}</Layout>

export default NewProjectPage`,
  true,
)

const mutationTokenized = tokenize.jsx(
  `// app/projects/mutations/createProject.ts
import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

// 这里提供运行时验证 + 类型安全
export const CreateProject = z
  .object({
    name: z.string(),
  })

// resolver.pipe 是一个函数式管道
export default resolver.pipe(
  // 验证输入数据
  resolver.zod(CreateProject),
  // 确保用户已经登陆
  resolver.authorize(),
  // 执行业务逻辑
  async (input) => {
    const project = await db.project.create({ data: input })
    return project
  }
)`,
  true,
)

const HeroCode = ({className = ""}) => {
  const isDesktop = useIsDesktop()
  const [tabs, setTabs] = useState([
    {
      title: isDesktop ? "mutations/createProject.ts" : "createProject.ts",
      tokens: mutationTokenized.tokens,
      selected: true,
    },
    {
      title: "pages/projects/new.tsx",
      tokens: pageTokenized.tokens,
      selected: false,
    },
  ])
  return (
    <CodeWindow
      className={className}
      tabs={tabs}
      onTabClick={(tabIndex) => {
        setTabs(
          tabs.map((tab, i) => ({
            ...tab,
            selected: i === tabIndex,
          })),
        )
      }}
    >
      <CodeWindow.Code tokens={tabs.find((tab) => tab.selected).tokens} />
    </CodeWindow>
  )
}

export {HeroCode}
