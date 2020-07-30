/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const user = /* GraphQL */ `
  query User($user_name: String!) {
    user(user_name: $user_name) {
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
export const getCompany = /* GraphQL */ `
  query GetCompany($user_name: String!) {
    getCompany(user_name: $user_name) {
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
export const getLeads = /* GraphQL */ `
  query GetLeads($user_name: String!) {
    getLeads(user_name: $user_name) {
      first_name
      last_name
      phone
      full_name
      created_at
      updated_at
    }
  }
`;
export const getServices = /* GraphQL */ `
  query GetServices($user_name: String!) {
    getServices(user_name: $user_name) {
      items {
        Data
        user_name
        status
        created_at
        updated_at
      }
      nextToken
    }
  }
`;
export const getProfile = /* GraphQL */ `
  query GetProfile($user_name: String!) {
    getProfile(user_name: $user_name) {
      user_name
      full_name
      first_name
      last_name
      phone
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
      companydetails {
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
export const getUserDetails = `query getUserProfile($user_name: String!){
  getCompany(
      user_name: $user_name
  ) {
      address1
      address2
      city
      company_number
      postcode
      region
      years_trading
  }
  user (
      user_name: $user_name
  ) {
      user_name
      full_name
      first_name
      last_name
      phone
  }
}`;