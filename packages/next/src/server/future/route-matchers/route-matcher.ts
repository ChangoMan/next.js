import type { RouteDefinition } from '../route-definitions/route-definition'
import type { RouteMatch } from '../route-matches/route-match'

export interface RouteMatcherOptions {
  /**
   * The pathname to match against.
   */
  pathname: string
}

export abstract class RouteMatcher<
  D extends RouteDefinition = RouteDefinition,
  M extends RouteMatcherOptions = RouteMatcherOptions
> {
  /**
   * True if this is a dynamic route.
   */
  public abstract readonly isDynamic: boolean

  /**
   * Identity returns the identity part of the matcher. This is used to compare
   * a unique matcher to another. This is also used when sorting dynamic routes,
   * so it must contain the pathname part.
   */
  public abstract readonly identity: string

  /**
   * Match will attempt to match the given options against this route.
   *
   * @param options The options to match against.
   */
  public abstract match(options: M): RouteMatch<D> | null

  /**
   * When set, this is an array of all the other matchers that are duplicates of
   * this one. This is used by the managers to warn the users about possible
   * duplicate matches on routes.
   */
  public duplicated?: Array<RouteMatcher>

  /**
   * The definition that this matcher is for.
   */
  public readonly definition: D

  /**
   * The output for this matcher that could be invoked upstream.
   */
  public readonly output: string

  constructor(definition: D, output: string) {
    this.definition = definition
    this.output = output
  }
}
