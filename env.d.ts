declare namespace NodeJS {
  interface ProcessEnv {
    /** ### API Host */
    readonly BACK_HOST: string
    /** ### API Port */
    readonly BACK_PORT: string
    /** ### API Path */
    readonly BACK_PATH: string
    /** ### Environment */
    readonly VITE_NODE_ENV: string
  }
}
