// The API returns either { message } for simple errors or a mongoose
// validation errors object ({ field: { message } }) for 500s from .save()/.update().
export const extractErrorMessage = (error) => {
    const data = error?.response?.data;

    if (!data) {
        return 'Ocorreu um erro. Tenta novamente.';
    }
    if (typeof data === 'string') {
        return data;
    }
    if (data.message) {
        return data.message;
    }

    const fieldErrors = Object.values(data)
        .map((entry) => entry?.message)
        .filter(Boolean);

    return fieldErrors.length ? fieldErrors.join(', ') : 'Ocorreu um erro. Tenta novamente.';
};
