export abstract class Role {
  public static readonly All_ROLES_SUCCESS: string =
    'All user roles have been succesfully fetched.';

  public static readonly All_ROLES_FAILURE: string =
    'Failed to get all the user roles.';

  public static readonly USER_ROLE_FAILED: string =
    'Failed to get the user role.';

  public static readonly USER_ROLE_SUCCESS: string =
    'User role has been successfully fetched.';

  public static readonly USER_ROLE: string = 'USER';
  public static readonly ADMIN_ROLE: string = 'ADMIN';
  public static readonly SUPER_ROLE: string = 'SUPER';
}
