export abstract class User {
  public static readonly USER_CREATED: string =
    'User has been successfully created.';

  public static readonly USER_DELETED: string =
    'User has been successfully deleted.';

  public static readonly USER_EXISTS: string =
    'Unable to register user. User already exists.';

  public static readonly USER_FETCHED: string =
    'User has been successfully fetched.';

  public static readonly USER_INVALID: string =
    'Unable to log user in. Invalid name or password.';

  public static readonly USER_LOGGED_IN: string =
    'User has been successfully logged in.';

  public static readonly USER_UPDATED: string =
    'User has been successfully updated.';

  public static readonly USERS_FETCHED: string =
    'All users have been successfully fetched.';

  public static readonly USER_ROLES: string =
    'User roles have been succesfully fetched.';
}
