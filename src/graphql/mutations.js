/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const addProfile = /* GraphQL */ `
  mutation AddProfile(
    $full_name: String
    $first_name: String
    $last_name: String
    $phone: String
  ) {
    addProfile(
      full_name: $full_name
      first_name: $first_name
      last_name: $last_name
      phone: $phone
    ) {
      user_name
      full_name
      first_name
      last_name
      phone
      company {
        user_name
        site_id
        address1
        address2
        city
        company_number
        postcode
        region
        years_trading
        user {
          user_name
          full_name
          first_name
          last_name
          phone
        }
      }
    }
  }
`;
export const addCompany = /* GraphQL */ `
  mutation AddCompany(
    $user_name: String
    $site_id: Int
    $address1: String
    $address2: String
    $city: String
    $company_number: String
    $postcode: String
    $region: String
    $years_trading: String
  ) {
    addCompany(
      user_name: $user_name
      site_id: $site_id
      address1: $address1
      address2: $address2
      city: $city
      company_number: $company_number
      postcode: $postcode
      region: $region
      years_trading: $years_trading
    ) {
      user_name
      site_id
      address1
      address2
      city
      company_number
      postcode
      region
      years_trading
      user {
        user_name
        full_name
        first_name
        last_name
        phone
        company {
          user_name
          site_id
          address1
          address2
          city
          company_number
          postcode
          region
          years_trading
        }
      }
    }
  }
`;
export const addLead = /* GraphQL */ `
  mutation AddLead(
    $PK: String
    $SK: String
    $Data: String
    $first_name: String
    $last_name: String
    $full_name: String
    $phone: String
    $created_at: AWSDateTime
    $updated_at: AWSDateTime
  ) {
    addLead(
      PK: $PK
      SK: $SK
      Data: $Data
      first_name: $first_name
      last_name: $last_name
      full_name: $full_name
      phone: $phone
      created_at: $created_at
      updated_at: $updated_at
    ) {
      PK
      Sk
      Data
      first_name
      last_name
      phone
      full_name
      created_at
      updated_at
    }
  }
`;
export const addService = /* GraphQL */ `
  mutation AddService(
    $PK: String
    $SK: String
    $Data: String
    $user_name: String
    $status: String
    $created_at: AWSDateTime
    $updated_at: AWSDateTime
  ) {
    addService(
      PK: $PK
      SK: $SK
      Data: $Data
      user_name: $user_name
      status: $status
      created_at: $created_at
      updated_at: $updated_at
    ) {
      PK
      SK
      Data
      user_name
      status
      created_at
      updated_at
    }
  }
`;
