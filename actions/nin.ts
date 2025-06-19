
export async function verifyNIN(nin: string): Promise<any> {
  
  if (!nin || nin.length !== 11) {
    const error = { 
      status: 718, 
      code: 718, 
      message: "nin must be length = 11",
      meta: { service: "nvs" }
    }
    console.error("NIN Validation Error:", error)
    return error
  }

  const API_KEY = "CCVb73G1EDmPpU4z13s4BWA"
  const API_URL = "https://e-nvs.digitalpulseapi.net/api/lookup/nin"
  
  try {
    const url = new URL(API_URL)
    url.searchParams.append("op", "level-4")
    url.searchParams.append("nin", nin)
    
    console.log(`Making API request to: ${url.origin}${url.pathname}?op=level-4&nin=****`)
    
    // Make the API request
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "api-key": API_KEY
      }
    })
    // Parse response
    const data = await response.json()
    // Log complete response to console (except for sensitive info)
    console.log("NIN Verification Response:", {
      status: data.status,
      isValid: data.status === 200,
      ...(data.data ? {
        personalInfo: {
          firstname: data.data.firstname,
          middlename: data.data.middlename,
          surname: data.data.surname,
          gender: data.data.gender,
          educationallevel: data.data.educationallevel,
          dateofbirth: data.data.dateofbirth,
        }
      } : {}),
      ...(data.message ? { message: data.message } : {}),
      ...(data.code ? { code: data.code } : {})
    })
    
    return data
  } catch (error) {
    console.error("NIN Verification Error:", error)
    return {
      status: 500,
      message: "An error occurred while verifying the NIN",
      error: (error as Error).message
    }
  }
}

verifyNIN("123").then(result => {
  console.log(`Status: ${result.status}, Message: ${result.message}`)
})

