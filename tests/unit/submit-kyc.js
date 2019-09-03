module.exports = {
  submitKYC,
}

function submitKYC(test, io, {
  API_KEY: apiKey,
}) {
  test('submit kyc status', async (t) => {
    const { body: { payload, }, } = await io.submitKYC({
      inputs: {
        auth: { apiKey, },
        payload: {
          first_name: 'john',
          last_name: 'doe',
          middle_name: 'shmoe',
          title: 'dev',
          date_of_birth: '1999-01-01',
          citizenship: 'USA',
          country: 'USA',
          state: 'CA',
          city: 'San Francisco',
          building_number: '5',
          flat_number: '510',
          itin: '31d0d89e-a5ea-4c83-b558-331b77ec6f4f',
          national_id: 'df9ca59c-619a-4ce4-95bd-7aefee044154',
          ssn: '8821dfe9-e1e5-4e8f-a6b8-9c7f409d6682',
          gender: 'male',
          phone_number: '1234567890',
          document_type: 'passport',
          document_front_image: new ArrayBuffer(),
          document_back_image: new ArrayBuffer(),
        },
      },
    })
    t.deepEqual({
      message: 'Kyc started.',
    }, payload, 'returns an address for a coin to be deposited into')
  })
}