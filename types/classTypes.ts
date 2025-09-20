import {User} from "@reformetypes/userTypes";

export type Class = {
    id: string
    title: string
    description: string
    size: number,
    length: number
    date: Date
    instructorId: User
}

export type ClassList = {
    classes: Class[]
}

export type CreateClassPayload = {
    title: string
    description: string
    size: number,
    length: number
    date: Date
    instructorId?: User | null
}

// class Classes(TimestampModel, UUIDModel):
// title = models.CharField(max_length=45)
// description = models.CharField(max_length=255)
// size = models.IntegerField(default=15)
// length = models.IntegerField(default=45)
// date = models.DateTimeField(null=True)
// instructor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='classes')
