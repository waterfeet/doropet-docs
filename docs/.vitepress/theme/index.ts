import DefaultTheme from 'vitepress/theme'
import ReleaseVersion from '../components/ReleaseVersion.vue'
import LatestDownload from '../components/LatestDownload.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('ReleaseVersion', ReleaseVersion)
    app.component('LatestDownload', LatestDownload)
  }
}
