import { isDynamicRoute } from '../../../../shared/lib/router/utils'
import {
  RouteMatchFn,
  getRouteMatcher,
} from '../../../../shared/lib/router/utils/route-matcher'
import { getRouteRegex } from '../../../../shared/lib/router/utils/route-regex'

type PathnameMatchResult = {
  /**
   * The params for the route if the route is dynamic.
   */
  params?: Record<string, string | string[]>
}

export class PathnameMatcher {
  /**
   * Whether the route is a dynamic route.
   */
  public readonly isDynamic: boolean

  /**
   * The route matcher function used to match dynamic routes.
   */
  private readonly matcher?: RouteMatchFn

  constructor(public readonly pathname: string) {
    this.isDynamic = isDynamicRoute(pathname)
    if (this.isDynamic) {
      this.matcher = getRouteMatcher(getRouteRegex(pathname))
    }
  }

  /**
   * Matches the given pathname against the route and returns any params if the
   * route was dynamic.
   *
   * @param pathname the pathname to match against
   * @returns the match result or null if the route did not match
   */
  public match(pathname: string): PathnameMatchResult | null {
    if (this.matcher) {
      const params = this.matcher(pathname)
      if (!params) return null

      return { params }
    }

    if (pathname === this.pathname) {
      return {}
    }

    return null
  }
}
