import json
import string
from get_context import get_context
from get_instruction import get_instruction

mock_data = [
    ('a4c897f5-02cb-43d3-b971-948c85537785', 'sidney@syncstream.ai'),
    ('a4c897f5-02cb-43d3-b971-948c85537785', 'sweetmantech@gmail.com'),
]

def create_campaign_registry_data(ideal_key_or_value, question):
    registry_data = ""

    for artist_id, email in mock_data:
        context = get_context(artist_id, email)
        instruction = get_instruction()
        instruction_str = json.dumps(instruction)

        if context:
            context_str = json.dumps(context)
        else:
            context_str = "No context available."

        ideal_value = context.get(ideal_key_or_value, ideal_key_or_value)

        content = {
            "input": (
                f"\n"
                f"Context: {context_str}\n"
                f"Question: {question}\n\n"
                f"{instruction_str}"
            ),
            "ideal": str(ideal_value),
        }
        
        registry_data += json.dumps(content) + "\n"

    return registry_data