import type { RouteMatch } from '../route-matches/route-match'
import type { RouteDefinition } from '../route-definitions/route-definition'

import { RouteMatcher, type RouteMatcherOptions } from './route-matcher'
import { PathnameMatcher } from './helpers/pathname-matcher'

type DefaultMatcherMatchOptions = RouteMatcherOptions

export class DefaultRouteMatcher<
  D extends RouteDefinition = RouteDefinition,
  M extends DefaultMatcherMatchOptions = DefaultMatcherMatchOptions
> extends RouteMatcher<D, M> {
  private readonly matcher: PathnameMatcher

  constructor(definition: D) {
    super(definition, definition.pathname)
    this.matcher = new PathnameMatcher(definition.pathname)
  }

  /**
   * Identity returns the identity part of the matcher. This is used to compare
   * a unique matcher to another. This is also used when sorting dynamic routes,
   * so it must contain the pathname part.
   */
  public get identity(): string {
    return this.definition.pathname
  }

  public get isDynamic() {
    return this.matcher.isDynamic
  }

  public match({ pathname }: M): RouteMatch<D> | null {
    const result = this.matcher.match(pathname)
    if (!result) return null

    return { definition: this.definition, params: result.params }
  }
}
