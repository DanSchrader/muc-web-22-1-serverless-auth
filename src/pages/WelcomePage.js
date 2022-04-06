import Main from '../components/Main'

const WelcomePage = () => {
  return (
    <Main>
      <h1>Welcome</h1>
      <h2>Resources</h2>
      <ul>
        <li>
          <a target="_blank" rel="noreferrer" href="https://jwt.io/">
            JWT.io
          </a>
        </li>
        <li>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/kelektiv/node.bcrypt.js"
          >
            bcrypt library for node
          </a>
        </li>
        <li>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/auth0/node-jsonwebtoken"
          >
            JWT library for node
          </a>
        </li>
        <li>
          <a target="_blank" rel="noreferrer" href="https://oauth.net/2/">
            OAuth.net
          </a>
        </li>
        <li>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://docs.github.com/en/developers/apps/building-oauth-apps/creating-an-oauth-app"
          >
            Registering GitHub oauth apps
          </a>
        </li>
        <li>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps#web-application-flow"
          >
            GitHub OAuth flow for web apps
          </a>
        </li>
      </ul>
    </Main>
  )
}
export default WelcomePage
