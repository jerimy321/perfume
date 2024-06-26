export const getClovaPerfumeInfo = (id: number, onData: (data: string) => void) => {
    try {
        console.log('getClovaPerfumeInfo id: ', id);
        const eventSource = new EventSource(`https://perfume-bside.site/api/clova/perfume/${id}/explanation/stream`, {
            withCredentials: true
        });

        eventSource.onmessage = (event) => {
            const result = JSON.parse(event.data);
            const content = result.message.content;
            console.log('getClovaPerfumeInfo content :', content);
            onData(content);
        };

        eventSource.onerror = (error) => {
            console.error('Error with SSE connection', error);
            eventSource.close();
        };

        // Cleanup function to close the event source when no longer needed
        return () => {
            eventSource.close();
        };
    } catch (error) {
        console.error('Error getClovaPerfumeInfo', error);
        throw error;
    }
};