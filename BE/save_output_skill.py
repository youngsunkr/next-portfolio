import os
import datetime
from typing import Dict, Any

def save_agent_output(content: str, filename: str, subfolder: str = "outputs") -> Dict[str, Any]:
    """
    Hermes Agent의 작업 결과물이나 생성된 코드를 로컬 디스크에 안전하게 저장합니다.
    
    :param content: 저장할 결과물 내용 (코드 또는 텍스트)
    :param filename: 확장자를 포함한 파일 이름 (예: 'MemberController.cs')
    :param subfolder: ~/.hermes/ 아래에 생성할 하위 폴더명
    :return: 저장 결과 및 절대 경로 정보
    """
    try:
        # 1. 저장할 기본 디렉터리 설정 (기본값: ~/.hermes/outputs)
        home_dir = os.path.expanduser("~")
        base_dir = os.path.join(home_dir, ".hermes", subfolder)
        
        if not os.path.exists(base_dir):
            os.makedirs(base_dir, exist_ok=True)
            
        # 2. 파일 절대 경로 생성
        file_path = os.path.join(base_dir, filename)
        
        # 3. 인코딩 오류 방지를 위해 utf-8로 안전하게 저장
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(content)
            
        return {
            "status": "success",
            "message": f"결과물이 성공적으로 저장되었습니다.",
            "saved_path": file_path,
            "timestamp": datetime.datetime.now().isoformat()
        }
        
    except Exception as e:
        return {
            "status": "error",
            "message": f"파일 저장 중 오류 발생: {str(e)}"
        }

# Hermes Agent가 스킬을 인식할 수 있도록 메타데이터 정의
SKILL_MANIFEST = {
    "name": "save_agent_output",
    "description": "에이전트가 생성한 중요 코드나 보고서 등의 결과물을 로컬 파일 시스템에 영구 저장할 때 사용합니다.",
    "parameters": {
        "type": "object",
        "properties": {
            "content": {"type": "string", "description": "저장할 파일의 전체 내용"},
            "filename": {"type": "string", "description": "확장자를 포함한 파일명 (예: api_spec.md)"},
            "subfolder": {"type": "string", "description": "저장할 폴더명 (기본값: outputs)"}
        },
        "required": ["content", "filename"]
    }
}