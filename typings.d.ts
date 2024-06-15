interface Project {
    id: string 
    title: string
    length: string
    description: string
    duration: DateTime
    valuation: string
    state: string
    city: string
    location: string 
    sharePrice: number 
    roi: number
}

interface User {
    id: string
    fullName: string 
    email: string
    password: string
    image: string 
}

interface Investment {
    id: string
    projectId: Project
    userId: User
    amount: number 
    investmentDate: string 
    payDay: string

}