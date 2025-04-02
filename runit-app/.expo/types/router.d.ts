/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `` | `/` | `/(app)` | `/(auth)` | `/(tabs)` | `/_sitemap` | `/club` | `/club-creation` | `/club-creation-step1` | `/club-creation-step2` | `/club-creation-step3` | `/club-creation-step4` | `/discovery` | `/feed` | `/login` | `/register` | `/register-step1` | `/register-step2` | `/register-step3` | `/run` | `/run-creation` | `/run-creation-step1` | `/run-creation-step2` | `/run-creation-step3` | `/run-creation-step4` | `/settings` | `/settings/(account)/change-password` | `/settings/(account)/edit-profil` | `/settings/(clubs)/my-clubs` | `/settings/(more)/give-feedback` | `/settings/(organization)/edit-information` | `/settings/(organization)/manage-roles` | `/settings/(runs)/manage-runs` | `/settings/change-password` | `/settings/edit-information` | `/settings/edit-profil` | `/settings/give-feedback` | `/settings/manage-roles` | `/settings/manage-runs` | `/settings/my-clubs` | `/user` | `/welcom`;
      DynamicRoutes: `/${Router.SingleRoutePart<T>}` | `/update/${Router.SingleRoutePart<T>}`;
      DynamicRouteTemplate: `/[id]` | `/update/[id]`;
    }
  }
}
