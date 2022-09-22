export abstract class Error {
  public static readonly AUTHORIZATION: string =
    'Authorization token is required.';

  public static readonly FAILED_CONNECTION: string =
    'Could not successfully connect to the database.';

  public static readonly TRANSACTION_FAILED: string =
    'There was an error completing the transaction.';
}
