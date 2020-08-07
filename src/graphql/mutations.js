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
    $user_name: String
    $first_name: String
    $last_name: String
    $full_name: String
    $phone: String
  ) {
    addLead(
      user_name: $user_name
      first_name: $first_name
      last_name: $last_name
      full_name: $full_name
      phone: $phone
    ) {
      first_name
      last_name
      phone
      full_name
    }
  }
`;
export const addService = /* GraphQL */ `
  mutation AddService(
    $user_name: String
    $status: String
    $service_name: String
    $callback_time: String
    $contract_end: String
    $contract_length: String
    $current_supplier: String
  ) {
    addService(
      user_name: $user_name
      status: $status
      service_name: $service_name
      callback_time: $callback_time
      contract_end: $contract_end
      contract_length: $contract_length
      current_supplier: $current_supplier
    ) {
      user_name
      status
      service_name
      callback_time
      contract_end
      contract_length
      cost_month
      cost_year
      current_supplier
      request_costs
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation updateUser(
    $user_name: String
    $full_name: String
    $first_name: String
    $last_name: String
    $phone: String
  ){
    updateUser(
      user_name: $user_name
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
  }
}
`;
export const updateCompany = /* GraphQL */ `
  mutation upateCompany(
    $user_name: String
    $address1: String
    $address2: String
    $city: String
    $postcode: String
  ){
    updateCompany(
      user_name: $user_name
      address1: $address1
      address2: $address2
      city: $city
      postcode: $postcode
  ) {
    user_name
    address1
    address2
    city
    postcode
  }
}
`;
export const deleteService = /* GraphQL */ `
  mutation deleteService(
    $user_name: String
    $id: String
  ){
    deleteService(
      user_name: $user_name
      id: $id
  ) {
    id
  }
}
`;